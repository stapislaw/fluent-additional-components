import React, {useState} from "react";
import { Checkbox, DetailsList, Dropdown, IDropdownOption, Stack, SelectionMode, TextField } from "@fluentui/react";
import { IPropertyGridProps } from "../types/i-property-grid-props";

/**
 * PropertyGrid component. Displays list of names and values. Currently supported types of values are: number, string, boolean and string[].
 * 
 * @param props - component properties.
 * @returns PropertyGrid component.
 */
export function PropertyGrid(props: IPropertyGridProps) {
    //onChange callback
    let callback = (name: string, value: any) => {};
    if(props.onChange !== undefined) {
        callback = (name: string, value: any) => {
            if(props.onChange !== undefined)
                props.onChange(name, value);
        };
    }
    
    return (
    <Stack styles={props.styles}>
        <DetailsList columns={[
            {key: "column1", name: "Name", minWidth: 30, fieldName: "name", isResizable: true},
            {key: "column2", name: "Value", minWidth: 30, fieldName: "value", isResizable: true, 
            onRender: (item) => <Input 
                onChange={(value) => {callback(item.name, value)}}
                value={item.value}
            ></Input>
        }
        ]} items={parseItems(props.items)} selectionMode={SelectionMode.none}
        compact={props.compact}></DetailsList>
    </Stack>
    );
}

/**
 * Returns React input component depending on type of given value.
 * 
 * @param props - component properties.
 * @returns input component corresponding to type of given value.
 */
const Input = (props: {value: any, onChange: (value: any) => void}) => {
    const [value, setValue] = useState(props.value);
    const handleValue = (value: any) => {
        props.onChange(value);
        setValue(value);
    };
    switch(typeof value) {
        case "number":
            return <TextField type="number" value={value.toString()} onChange={(e) => handleValue((e.target as HTMLInputElement).valueAsNumber)}></TextField>
        case "string":
            return <TextField type="text" value={value} onChange={(e) => handleValue((e.target as HTMLInputElement).value)}></TextField>
        case "boolean":
            return <Checkbox checked={value} onChange={(e) => handleValue((e?.target as HTMLInputElement).checked)}></Checkbox>
        default:
            if(Array.isArray(value)) {
                const options: IDropdownOption[] = [];
                value.forEach(element => {
                    options.push({key: element, text: element});
                });
                return <Dropdown options={options} onChange={(e) => handleValue((e.target as HTMLSelectElement).value)}></Dropdown>
            }
            return null;
    }
}

/**
 * Parse given items to format for DetailsList component.
 * 
 * @param items - array to parse in which all elements are arrays where first element is name and second is value.
 * @returns array of parsed items.
 */
const parseItems = (items: any[]) => {
    const parsedItems: any[] = [];
    items.map((item: string[], i: number) => {
        const name = item[0];
        const value = item[1];
        parsedItems.push({key: i.toString(), name, value})
    });
    return parsedItems;
}