import React, { useState } from "react";
import { Dropdown } from "../../components/Dropdown";
import Input from "../../components/Input";
import { PrimaryButton } from "../../components/PrimaryButton";
import BackArrow from "../../components/BackArrow";
import { SecondaryButton } from "../../components/SecondaryButton";

export function New() {
  const steps = [
    {
      number: 1,
      name: "Paketdetaljer",
    },
    { number: 2, name: "Mottagare" },
    {
      number: 3,
      name: "Gränsvärden",
    },
    {
      number: 4,
      name: "Sammanfattning",
    },
  ];
  const [currentStep, setCurrentStep] = useState(steps[0]);
  const [packageDetails, setPackageDetails] = useState({});

  function nextStep(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    console.log("next step", currentStep);
    const next = steps.find((s) => s.number === currentStep.number + 1);
    if (next) {
      setCurrentStep(next);
    } else {
      submitForm();
    }
  }
  function submitForm() {
    // TODO
    alert("Skicka till api.");
    console.log("Nytt paket:", packageDetails);
  }
  function prevStep(e) {
    e.preventDefault();
    const prev = steps.find((s) => s.number === currentStep.number - 1);
    if (prev) {
      setCurrentStep(prev);
    }
  }

  const priorities = [
    { value: "normal", label: "Normal" },
    { value: "economy", label: "Ekonomi" },
    { value: "express", label: "Express" },
  ];
  const [priority, setPriority] = useState({ value: "", label: "" }); // TODO flytta in i packageDetails

  return (
    <main className="flex flex-col p-8 gap-8 max-w-4xl mx-auto">
      <header className="flex gap-2">
        <BackArrow />
        <div className="flex flex-col">
          <h1 className="text-4xl">Nytt paket</h1>
          <p>
            Steg {currentStep.number} av {steps.length}: {currentStep.name}
          </p>
        </div>
      </header>
      <form className="flex flex-col gap-8 bg-white/75 p-4 m-[-1rem] rounded-b-3xl rounded-t-2xl min-h-[calc(100vh-16rem)]">
        {currentStep.number == 1 && (
          <>
            <Input
              label="Beskrivning"
              id="a"
              name="description"
              onChange={(e) =>
                setPackageDetails({
                  ...packageDetails,
                  description: e.target.value,
                })
              }
              value={packageDetails.description || ""}
            />
            <Input
              label="Vikt (kg)"
              name="0.0"
              id="weight"
              onChange={(e) =>
                setPackageDetails({
                  ...packageDetails,
                  weight: e.target.value,
                })
              }
              value={packageDetails.weight || ""}
            />
            <fieldset className="flex flex-wrap gap-4">
              <legend>Storlek (cm)</legend>
              <Input
                label=""
                id="l"
                name="Längd"
                className="flex-1 basis-full md:basis-1/4"
                onChange={(e) =>
                  setPackageDetails({
                    ...packageDetails,
                    length: e.target.value,
                  })
                }
                value={packageDetails.length || ""}
              />
              <Input
                label=""
                id="w"
                name="Bredd"
                className="flex-1 basis-full md:basis-1/4"
                onChange={(e) =>
                  setPackageDetails({
                    ...packageDetails,
                    width: e.target.value,
                  })
                }
                value={packageDetails.width || ""}
              />
              <Input
                label=""
                id="h"
                name="Höjd"
                className="flex-1 basis-full md:basis-1/4"
                onChange={(e) =>
                  setPackageDetails({
                    ...packageDetails,
                    height: e.target.value,
                  })
                }
                value={packageDetails.height || ""}
              />
            </fieldset>
            <label>
              Prioritet
              <Dropdown
                onSelect={(o) => setPriority(o)}
                options={priorities}
                selectedValue={priority.value}
                placeholder="Välj prioritet"
              />
            </label>
            <Input
              label="Önskad leveransdag"
              id="delivery-date"
              name="åååå-mm-dd"
              type="date"
              onChange={(e) =>
                setPackageDetails({
                  ...packageDetails,
                  deliveryDate: e.target.value,
                })
              }
              value={packageDetails.deliveryDate || ""}
            />
          </>
        )}
        {currentStep.number == 2 && (
          <>
            <Input label="Namn" id="name" name="name" />
            <Input label="Adress" id="address" name="address" />
            <Input label="Postnummer" id="postal" name="postal" />
            <Input label="Stad" id="city" name="city" />
          </>
        )}
        {currentStep.number == 3 && (
          <>
            <label>
              {" "}
              Typ av paket/Gränsvärden
              {/* <Dropdown */}
            </label>
            <Input
              label="Högsta temperatur (°C)"
              id="max-temp"
              name="max-temp"
              onChange={(e) =>
                setPackageDetails({
                  ...packageDetails,
                  maxTemp: e.target.value,
                })
              }
              value={packageDetails.maxTemp || ""}
            />
            <Input
              label="Gräns luftfuktighet (%)"
              id="max-humidity"
              name="max-humidity"
              onChange={(e) =>
                setPackageDetails({
                  ...packageDetails,
                  maxHumidity: e.target.value,
                })
              }
              value={packageDetails.maxHumidity || ""}
            />
          </>
        )}
        {currentStep.number == 4 && (
          <>
            <p>Kontrollera att uppgifterna stämmer.</p>
            <dl className="grid grid-cols-2 gap-x-8 gap-y-4">
              <dt>Beskrivning</dt>
              <dd>{packageDetails.description}</dd>
              <dt>Vikt</dt>
              <dd>{packageDetails.weight} kg</dd>
              <dt>Storlek (LxBxH)</dt>
              <dd>
                {packageDetails.length} x {packageDetails.width} x{" "}
                {packageDetails.height} cm
              </dd>
              <dt>Prioritet</dt>
              <dd>{priority.label}</dd>
              <dt>Önskad leveransdag</dt>
              <dd>{packageDetails.deliveryDate}</dd>
              <dt>Max temperatur</dt>
              <dd>{packageDetails.maxTemp} °C</dd>
              <dt>Max luftfuktighet</dt>
              <dd>{packageDetails.maxHumidity} %</dd>
            </dl>
          </>
        )}
        <nav
          className={
            "grid " +
            (currentStep.number != 1
              ? "sm:grid-cols-1 md:grid-cols-2"
              : "grid-cols-1") +
            " gap-4 mt-auto"
          }
        >
          {currentStep.number != 1 && (
            <SecondaryButton text="Föregående steg" onClick={prevStep} />
          )}
          <PrimaryButton
            text={
              currentStep.number != steps.length ? "Nästa steg" : "Skapa paket"
            }
            onClick={nextStep}
          />
        </nav>
      </form>
    </main>
  );
}
