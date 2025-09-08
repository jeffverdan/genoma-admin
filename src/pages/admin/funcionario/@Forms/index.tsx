// app.tsx
import { useCallback, useState } from "react";
import { Formity, type OnReturn } from "@formity/react";
import { schema, type Values, type Params } from "./@Steps/@Schema";
import type { Status } from "./multi-step";

type FormPropsType = {
  setCurrentStep: (e: number) => void
}

export default function Form({ setCurrentStep }: FormPropsType) {
  const [status, setStatus] = useState<Status>({
    type: "formity",
    moving: false,
    submitting: false,
  });

  // CHAMA APENAS NO ULTIMO STEP
  const onReturn = useCallback<OnReturn<Values>>(async (output) => {
    setStatus({ type: "formity", moving: false, submitting: true });

    // Show output in the console
    console.log("Saida: ", output);

    // Simulate a network request
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setStatus({ type: "end" });
  }, []);

  if (status.type === "end") {
    return (
      <>

      </>
    );
  };

  const onSave = (index: number, callback: (values: object) => void) => (values: object) => {
    console.log("Step: ", index);
    console.log("Form to Save: ", values);
    
    callback(values);
    setCurrentStep(index);
  };

  return (
    <section className='formity-forms'>
      <Formity<Values, object, Params>
        schema={schema}
        params={{ status, onSave: onSave }}
        onReturn={onReturn}
      />
    </section>
  );
}