import { caStates, usStates } from "./global-functions";

/**
 * Render Canada states or USA states for selection
 */
export const cnbRenderCountryStates = function (country: string) {
  const allStates = country == "US" ? usStates : caStates;
  let statesOptions = [
    <option key={"EMPTY"} value="">
      Select state...
    </option>,
  ];
  for (const key in allStates) {
    statesOptions.push(
      <option key={key} value={key}>
        {allStates[key]}
      </option>
    );
  }
  return statesOptions;
};
