import * as React from "react"
import { getInputProps } from "../../../forms"
import { Button, Input, TextArea, Dropdown } from "@react95/core"
import { toMap } from "../../../utils/map"
import { callback, call } from "../../../utils"

export const react95Inputs: Partial<InputRenderMap> = {
    ...toMap<InputBoxType, InputBoxRenderFn>(
        ["text", "email", "password", "number", "customBox"],
        k => k,
        () => p => <Input {...getInputProps(p)} />
    ),
    select: ({ ...p }) => {
        const props = getInputProps(p)
        const options = p.schema.values.map(a => a[0])
        const selected = p.schema.values.find(v => v[1] === props.value)
        const value = selected ? selected[0] : ""
        const onChange: React.ChangeEventHandler<any> = e => {
            const v = p.schema.values.find(v => v[0] === (e as any).target.value)
            if (v) call(props.onChange, { target: { value: v[1] } } as any)
        }
        return <Dropdown {...props} options={options} onChange={onChange} value={value} />
    },
    textarea: p => <TextArea {...getInputProps(p)} />
}

export const react95Elements: Partial<ElementsRenderMap> = {
    Button: p => <Button onClick={callback(p.onClick)} value={p.children ? `${p.children}` : ""} />
}