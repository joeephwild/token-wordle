import React, { useState, useEffect, useRef } from "react";

const Stepper = ({ steps, currentStep }) => {
  const [newStep, setNewStep] = useState([]);
  const stepsRef = useRef();

  const updateStep = (stepNumber, steps) => {
    const newSteps = [...steps];
    console.log(newSteps);
    let count = 0;
    while (count < newSteps.length) {
      //current step
      if (count === stepNumber) {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: true,
          selected: true,
          completed: true,
        };
        count++;
      }

      //step completed
      else if (count < stepNumber) {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: false,
          selected: true,
          completed: true,
        };
        count++;
      }
      //step pending
      else {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: false,
          selected: false,
          completed: false,
        };
        count++;
      }
    }

    return newSteps;
  };

  useEffect(() => {
    const stepsState = steps.map((step, index) =>
      Object.assign(
        {},
        {
          description: step,
          completed: false,
          highlighted: index === 0 ? true : false,
          selected: index === 0 ? true : false,
        }
      )
    );

    stepsRef.current = stepsState;
    const current = updateStep(currentStep - 1, stepsRef.current);
    setNewStep(current);
  }, [steps, currentStep]);

  const stepsDisplay = newStep.map((step, index) => {
    return (
      <div
        key={index}
        className={
          index !== newStep.length - 1
            ? "w-full flex items-center"
            : "flex items-center"
        }
      >
        <div className="relative flex flex-col items-center text-teal-600">
          <div
            className={`rounded-xl transition bg-[#F9F9F9] text-black duration-500 ease-in-out h-12 w-12 flex items-center justify-center py-3  ${
              step.selected
                ? "bg-[#FFB900] font-bold shadow-xl"
                : ""
            }`}
          >
            {/* {step.completed ? ( */}
              <span className="font-bold text-xl">{/*&#10003;*/}{index+1}</span>
            {/* ) : ( */}
              
            {/* )} */}
          </div>
        </div>
        <div
          className={`flex-auto border-t-2 transition duration-500 ease-in-out border-black `}
        ></div>
      </div>
    );
  });

  return (
    <div className="mx-4 flex justify-between items-center">
      {stepsDisplay}
    </div>
  );
};
export default Stepper;
