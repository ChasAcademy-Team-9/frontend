import React, { useEffect, useState } from "react";
import { Dropdown } from "../../components/Dropdown";
import Input from "../../components/Input";
import { PrimaryButton } from "../../components/PrimaryButton";
import BackArrow from "../../components/BackArrow";
import { SecondaryButton } from "../../components/SecondaryButton";

type PackageDetails = {
  PackageID?: number;

  DriverID?: number;
  ReceiverID?: number;
  SenderID?: number;

  Status?: string;

  PackageWeight?: number;
  PackageDepth?: number;
  PackageWidth?: number;
  PackageHeight?: number;

  Origin?: string;
  Destination?: string;
};

export function New() {
  const steps = [
    {
      number: 1,
      name: "Paketdetaljer",
    },
    { number: 2, name: "Leverans" },
    {
      number: 3,
      name: "Adresser",
    },
    {
      number: 4,
      name: "Sammanfattning",
    },
  ];
  const [currentStep, setCurrentStep] = useState(steps[0]);
  const [packageDetails, setPackageDetails] = useState({
    SenderID: 1, // TODO Lägg in sender id från JWT-token
    PackageID: 999, // Skapas av api? Dokumentationen säger att det ska skickas
    Status: "Created", // Samma här
  } as PackageDetails);

  function nextStep(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const next = steps.find((s) => s.number === currentStep.number + 1);
    if (next) {
      setCurrentStep(next);
    } else {
      submitForm();
    }
  }
  async function submitForm() {
    console.log("Nytt paket:", packageDetails);
    const response = await fetch(
      "https://team9testwebapp-h3b5c7gqgbeqhxgp.swedencentral-01.azurewebsites.net/api/packages",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(packageDetails),
      },
    );
    const data = await response.json();
    console.log(data);
    if (data.success == true) {
      alert("Paket skapat.");
      console.log("Paket skapat. Svar från API:", data);
    }
  }

  function prevStep(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const prev = steps.find((s) => s.number === currentStep.number - 1);
    if (prev) {
      setCurrentStep(prev);
    }
  }

  const [drivers, setDrivers] = useState([]);
  useEffect(() => {
    async function fetchDrivers() {
      const response = await fetch(
        "https://team9testwebapp-h3b5c7gqgbeqhxgp.swedencentral-01.azurewebsites.net/api/register/drivers",
      );
      const { drivers } = await response.json();
      const driverOptions = drivers.map((driver: Driver) => ({
        value: driver.DriverID,
        label: driver.FirstName + " " + driver.LastName,
      }));
      setDrivers(driverOptions);
    }
    fetchDrivers();
  }, []);

  const [recievers, setReceivers] = useState([]);
  useEffect(() => {
    async function fetchReceivers() {
      const response = await fetch(
        "https://team9testwebapp-h3b5c7gqgbeqhxgp.swedencentral-01.azurewebsites.net/api/register/receivers",
      );
      const data = await response.json();
      const receivers = data.drivers; // OBS Intressant namngivning i api. Enligt dokumentation.
      console.log("Mottagare hämtade från API:", receivers);
      const receiverOptions = receivers.map((receiver: Receiver) => ({
        value: receiver.ReceiverID,
        label: receiver.FirstName + " " + receiver.LastName,
      }));
      setReceivers(receiverOptions);
    }
    fetchReceivers();
  }, []);

  const [driver, setDriver] = useState({ value: "", label: "" });
  const [receiver, setReceiver] = useState({ value: "", label: "" });

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
              label="Vikt (kg)"
              name="0.0"
              id="weight"
              onChange={(e) =>
                setPackageDetails({
                  ...packageDetails,
                  PackageWeight: +e.target.value,
                })
              }
              value={packageDetails.PackageWeight || ""}
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
                    PackageDepth: +e.target.value,
                  })
                }
                value={packageDetails.PackageDepth || ""}
              />
              <Input
                label=""
                id="w"
                name="Bredd"
                className="flex-1 basis-full md:basis-1/4"
                onChange={(e) =>
                  setPackageDetails({
                    ...packageDetails,
                    PackageWidth: +e.target.value,
                  })
                }
                value={packageDetails.PackageWidth || ""}
              />
              <Input
                label=""
                id="h"
                name="Höjd"
                className="flex-1 basis-full md:basis-1/4"
                onChange={(e) =>
                  setPackageDetails({
                    ...packageDetails,
                    PackageHeight: +e.target.value,
                  })
                }
                value={packageDetails.PackageHeight || ""}
              />
            </fieldset>
          </>
        )}
        {currentStep.number == 2 && (
          <>
            <label>
              Förare
              <Dropdown
                onSelect={(o) => {
                  setDriver(o);
                  setPackageDetails({
                    ...packageDetails,
                    DriverID: +o.value,
                  });
                }}
                options={drivers}
                selectedValue={driver.value}
                placeholder="Välj förare"
              />
            </label>
            <label>
              Mottagare
              <Dropdown
                onSelect={(o) => {
                  setReceiver(o);
                  setPackageDetails({
                    ...packageDetails,
                    ReceiverID: +o.value,
                  });
                }}
                options={recievers}
                selectedValue={receiver.value}
                placeholder="Välj mottagare"
              />
            </label>
          </>
        )}
        {currentStep.number == 3 && (
          <>
            <Input
              label="Avsändarens adress"
              id="origin"
              name="Malmö"
              onChange={(e) =>
                setPackageDetails({
                  ...packageDetails,
                  Origin: e.target.value,
                })
              }
              value={packageDetails.Origin || ""}
            />
            <Input
              label="Mottagarens adress"
              id="destination"
              name="Göteborg"
              onChange={(e) =>
                setPackageDetails({
                  ...packageDetails,
                  Destination: e.target.value,
                })
              }
              value={packageDetails.Destination || ""}
            />
          </>
        )}
        {currentStep.number == 4 && (
          <>
            <p>Kontrollera att uppgifterna stämmer.</p>
            <table className="text-left">
              <caption className="text-left text-xl border-b">
                Paketdetaljer
              </caption>
              <tbody>
                <tr>
                  <th>Vikt</th>
                  <td>{packageDetails.PackageWeight + " kg"}</td>
                </tr>
                <tr>
                  <th>Storlek</th>
                  <td>
                    {packageDetails.PackageDepth} x{" "}
                    {packageDetails.PackageWidth} x{" "}
                    {packageDetails.PackageHeight} cm
                  </td>
                </tr>
              </tbody>
            </table>
            <table className="text-left">
              <caption className="text-left text-xl border-b">Leverans</caption>
              <tbody>
                <tr>
                  <th className="w-1/4">Förare</th>
                  <td>{driver.label}</td>
                </tr>
                <tr>
                  <th>Mottagare</th>
                  <td>{receiver.label}</td>
                </tr>
              </tbody>
            </table>
            <table className="text-left">
              <caption className="text-left text-xl border-b">Adresser</caption>
              <tbody>
                <tr>
                  <th className="w-1/4">Avsändare</th>
                  <td>{packageDetails.Origin}</td>
                </tr>
                <tr>
                  <th>Mottagare</th>
                  <td>{packageDetails.Destination}</td>
                </tr>
              </tbody>
            </table>
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

type Driver = {
  FirstName: string;
  LastName: string;
  Password: string;
  DriverID: number;
  UserName: string;
};
type Receiver = {
  FirstName: string;
  LastName: string;
  Password: string;
  ReceiverID: number;
  UserName: string;
};
