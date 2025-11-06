import React from "react";
import Input from "../atoms/Input";

function DynamicInputs({ Inputs = [], className = "" }) {
    return (
        <>
            {Inputs.map((input) => (
                <div className={className}>
                    <Input key={input.name || index}type={input.type || "text"} placeholder={input.placeholder} name={input.name} value={input.value} 
                    onChange={input.onChange} required={input.required} autoComplete={input.autoComplete} disabled={input.disabled} className={input.className} />
                </div>
            ))}
        </>
    );
}
export default DynamicInputs;