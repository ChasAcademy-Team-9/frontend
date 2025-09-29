import { useState } from "react";
import { Dropdown } from "../../components/Dropdown";
import Input from "../../components/Input";
import { PrimaryButton } from "../../components/PrimaryButton";
import { useNavigate } from "react-router-dom";
import BackArrow from "../../components/BackArrow";

export function New() {
  const priorities = [
    { value: "normal", label: "Normal" },
    { value: "economy", label: "Ekonomi" },
    { value: "express", label: "Express" },
  ];
  const [priority, setPriority] = useState(priorities[0]);
  const navigate = useNavigate();

  return (
    <main className="flex flex-col p-8 gap-8">
      <BackArrow />
      <h1>Nytt paket</h1>
      <p>Steg 1 av 4: Paketdetaljer</p>
      <form className="flex flex-col gap-8">
        <Input label="Beskrivning" id="a" name="description" />
        <Input label="Vikt (kg)" name="0.0" id="weight" />
        <fieldset className="flex">
          <legend>Dimensioner (cm)</legend>
          <Input label="" id="l" name="Längd" />
          <Input label="" id="w" name="Bredd" />
          <Input label="" id="h" name="Höjd" />
        </fieldset>
        <label>
          Prioritet
          <Dropdown
            onSelect={(o) => setPriority(o)}
            options={priorities}
            selectedValue={priority.value}
            placeholder="Välj priotitet"
          />
        </label>
        <Input
          label="Önskad leveransdag"
          id="delivery-date"
          name="åååå-mm-dd"
          type="date"
        />
        <PrimaryButton text="Nästa steg" onClick={() => navigate(2)} />
      </form>
    </main>
  );
}
