# Nest Thermostat

[![Npm package version](https://badgen.net/npm/v/nest-thermostat-lit)](https://npmjs.com/package/nest-thermostat-lit)
[![GitHub release](https://img.shields.io/github/release/Naereen/StrapDown.js.svg)](https://github.com/berrywhite96/nest-thermostat)
[![GitHub license](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)](https://github.com/Naereen/StrapDown.js/blob/master/LICENSE)

<img width="400" alt="thermostat" src="https://user-images.githubusercontent.com/24818127/220744921-914483e3-98da-461c-a176-fd3b3d900d55.png">

Nest thermostat like lit element

Based on the thermostat by [Dal Hundal](https://codepen.io/dalhundal).

Source: [Codepen](https://codepen.io/dalhundal/pen/KpabZB/).

## Configuration

| Name                         | Type       | Default  | Description                                                                                                  |
| ---------------------------- | ---------- | -------- | ------------------------------------------------------------------------------------------------------------ |
| `target_temperature`         | `double`   | `20.0`   | Defines the target temperature on the thermostat                                                             |
| `ambient_temperature`        | `double`   | `18.0`   | Defines the ambient temperature on the thermostat                                                            |
| `current_temperature`        | `double`   | Optional | Defines the current temperature on the thermostat                                                            |
| `current_humidity`           | `double`   | Optional | Defines the current temperature on the thermostat                                                            |
| `min_value`                  | `int`      | `10`     | Sets the minimum value of the thermostat                                                                     |
| `max_value`                  | `int`      | `30`     | Sets the maximum value of the thermostat                                                                     |
| `step`                       | `double`   | `0.5`    | Sets the step between the temperature values                                                                 |
| `enable_ambient_temperature` | `bool`     | `false`  | Enables the ambient temperature on the thermostat                                                            |
| `enable_current_action`      | `bool`     | `false`  | Enables the current action on the thermostat                                                                 |
| `current_action`             | `string`   | Optional | Shows the corresponding action icon, choose between `off`, `heat`, `cool`, `heat_cool`, `dry`, `fan`, `auto` |
| `action_active`              | `bool`     | Optional | Enables the action icon                                                                                      |
| `enable_move_buttons`        | `bool`     | `true`   | Enables the move buttons on the thermostat                                                                   |
| `onSetTargetTemperature`     | `function` | Optional | Event function called when target temperature changes, passes parameter `target_temperature`                 |

## License

This project is under the [MIT](https://opensource.org/licenses/MIT) license.
