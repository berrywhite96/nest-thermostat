import { LitElement, html, svg } from "lit";
import style from "./style.css";
import { ELEMENT_TAG } from "./const.js";

/**
 *
 * Nest thermostat like lit element
 *
 * Based on the thermostat by Dal Hundal (https://codepen.io/dalhundal)
 * source: https://codepen.io/dalhundal/pen/KpabZB/
 *
 */
class ThermostatControl extends LitElement {
    /**
     * Define element properties and default values
     */
    static get properties() {
        return {
            target_temperature: {
                type: Number,
            },
            ambient_temperature: {
                type: Number,
            },
            current_temperature: {
                type: Number,
            },
            current_humidity: {
                type: Number,
            },
            // possible values: off, heat, cool, heat/cool, dry, fan, auto
            current_action: {
                type: String,
            },
            action_active: {
                type: Boolean,
            },
            min_value: {
                type: Number,
            },
            max_value: {
                type: Number,
            },
            step: {
                type: Number,
            },
            enable_ambient_temperature: {
                type: Boolean,
            },
            enable_current_action: {
                type: Boolean,
            },
            enable_move_buttons: {
                type: Boolean,
            },
            onSetTargetTemperature: {
                type: Object,
            },
        };
    }

    constructor() {
        super();

        // State config
        this.target_temperature = 20.0;

        // UI config
        this.diameter = 400; // is not an property
        this.min_value = 10;
        this.max_value = 30;
        this.step = 0.5;
        this.action_active = false;
        this.enable_ambient_temperature = false;
        this.enable_current_action = false;
        this.enable_move_buttons = true;

        this.onSetTargetTemperature = function (target_temperature) {};

        this.numTicks = 120;
        this.tickPoints = [
            [this.configuration.radius - 1, this.configuration.ticksOuterRadius],
            [this.configuration.radius + 1, this.configuration.ticksOuterRadius],
            [this.configuration.radius + 1, this.configuration.ticksInnerRadius],
            [this.configuration.radius - 1, this.configuration.ticksInnerRadius],
        ];
        this.tickPointsLarge = [
            [this.configuration.radius - 1.5, this.configuration.ticksOuterRadius],
            [this.configuration.radius + 1.5, this.configuration.ticksOuterRadius],
            [this.configuration.radius + 1.5, this.configuration.ticksInnerRadius + 20],
            [this.configuration.radius - 1.5, this.configuration.ticksInnerRadius + 20],
        ];
        this.theta = this.configuration.tickDegrees / this.numTicks;
    }

    /**
     *  Gets configuration
     */
    get configuration() {
        let tickDegrees = 300;
        let radius = this.diameter / 2;
        let ticksOuterRadius = this.diameter / 30;
        let ticksInnerRadius = this.diameter / 8;

        return {
            tickDegrees: tickDegrees, //  Degrees of the dial that should be covered in tick lines
            rangeValue: this.max_value - this.min_value,
            radius: radius,
            ticksOuterRadius: ticksOuterRadius,
            ticksInnerRadius: ticksInnerRadius,
            hvac_states: ["off", "heating", "cooling"],
            dragLockAxisDistance: 15,
            lblAmbientPosition: [radius, ticksOuterRadius - (ticksOuterRadius - ticksInnerRadius) / 2],
            offsetDegrees: 180 - (360 - tickDegrees) / 2,
        };
    }

    /**
     * Return only first decimal place from target temperature
     * @returns int
     */
    get _targetTemperatureDecimal() {
        // Do modular on the hard way (because JS can't do real mod for floating numbers)
        return parseInt(this.target_temperature * 10) % 10;
    }

    /**
     * Defines CSS styles
     * @returns css
     */
    static get styles() {
        return style;
    }

    /**
     * On svg mouse pressed down, remember this
     * @param {MouseEvent} ev
     */
    onPointerDown(ev) {
        let x = ev.offsetX;
        let y = ev.offsetY;

        // Remember mouse pressed down
        if (this.isPointInControlCircle(x, y)) {
            this._mouseDown = true;
            let temperature = this.setSteppedTemperatureByPoint(x, y);
        }
    }

    /**
     * On svg mouse pressed up, remember this
     * @param {MouseEvent} ev MouseEvent
     */
    onPointerEnd(ev) {
        this._mouseDown = false;
    }

    /**
     * On svg mouse move if mouse is pressed down
     * @param {MouseEvent} ev
     */
    onPointerMove(ev) {
        // Return if mouse is pressed down
        if (!this._mouseDown) return;

        let temperature = this.setSteppedTemperatureByPoint(ev.offsetX, ev.offsetY);
    }

    /**
     * On move up click
     * @param {MouseEvent} ev
     */
    onMoveUpClick(ev) {
        this.setSteppedTargetTemperature(this.target_temperature + this.step);
    }

    /**
     * On move down click
     * @param {MouseEvent} ev
     */
    onMoveDownClick(ev) {
        this.setSteppedTargetTemperature(this.target_temperature - this.step);
    }

    /**
     * Set target temperature stepped wise
     * @param {int} targetTemperature
     */
    setSteppedTargetTemperature(targetTemperature) {
        if (targetTemperature < this.min_value || targetTemperature > this.max_value) return;

        this.target_temperature = Math.round(targetTemperature * (1 / this.step)) / (1 / this.step);
        this.onSetTargetTemperature(targetTemperature);
    }

    /**
     * Get infos about degree and radius by clicked point within control circle
     * @param {int} x
     * @param {int} y
     * @returns {
     *    radius: {double},
     *    degree: {double},
     * }
     */
    getControlCircleInfosByPoint(x, y) {
        let svgElement = this.renderRoot.querySelector("svg");

        // Check if pointer is in control radius
        let clickedRadius = Math.sqrt(
            Math.pow(x - svgElement.clientWidth / 2, 2) + Math.pow(svgElement.clientHeight / 2 - y, 2)
        );

        return {
            radius: clickedRadius,
            degree: Math.asin((svgElement.clientHeight / 2 - y) / clickedRadius),
        };
    }

    /**
     * Checks if given point is in control circle
     * @param {int} x
     * @param {int} y
     * @returns boolean isPointInControl
     */
    isPointInControlCircle(x, y) {
        let svgElement = this.renderRoot.querySelector("svg");
        console.log(svgElement);

        // Check if pointer is in control radius
        let clickedCircleInfos = this.getControlCircleInfosByPoint(x, y);
        let innerPerc = 1 - this.configuration.ticksInnerRadius / this.configuration.radius;
        let outerPerc = 1 - this.configuration.ticksOuterRadius / this.configuration.radius;
        let clickedRadiusPerc = clickedCircleInfos.radius / (svgElement.clientWidth / 2);

        // Continue if in radius
        if (outerPerc > clickedRadiusPerc && clickedRadiusPerc > innerPerc && clickedCircleInfos.degree > -1.05)
            return true;

        return false;
    }

    /**
     * Sets stepped temperature by mouse point
     * @param {int} x
     * @param {int} y
     * @returns double temperature
     */
    setSteppedTemperatureByPoint(x, y) {
        let svgElement = this.renderRoot.querySelector("svg");
        let clickedCircleInfos = this.getControlCircleInfosByPoint(x, y);

        // Continue if in radius
        if (clickedCircleInfos.degree < -1.05) return;

        // Calculate target temperature
        let controlSize = this.max_value - this.min_value;
        let targetSlice = (Math.PI / 2 + 1.05) / (controlSize / this.step / 2);
        let temperature;

        if (x < svgElement.clientWidth / 2)
            temperature = this.min_value + (clickedCircleInfos.degree + 1.05) / targetSlice / (1 / this.step);
        else temperature = controlSize - (clickedCircleInfos.degree - Math.PI / 2) / targetSlice / (1 / this.step);

        // Set temperature
        if (!temperature) return;
        this.setSteppedTargetTemperature(temperature);

        return temperature;
    }

    /**
     * Set ambient temperature stepped wise
     * @param int ambientTemperature
     */
    setSteppedAmbientTemperature(ambientTemperature) {
        if (ambientTemperature < this.min_value || ambientTemperature > this.max_value) return;

        this.ambient_temperature = Math.round(ambientTemperature * (1 / this.step)) / (1 / this.step);
    }

    /**
     * Render circle background & indicator
     * @returns svg
     */
    renderCircle() {
        return svg`
            <circle
                class="dial__shape"
                cx="${this.configuration.radius}"
                cy="${this.configuration.radius}"
                r="${this.configuration.radius}"
            ></circle>

            <path
                class="dial__editableIndicator"
                d="${this.donutPath(
                    this.configuration.radius,
                    this.configuration.radius,
                    this.configuration.radius - 4,
                    this.configuration.radius - 8
                )}"
            ></path>`;
    }

    /**
     * Render move target temperature up button
     * @returns svg
     */
    renderMoveUp() {
        if (!this.enable_move_buttons) return svg``;

        return svg`
            <rect @click="${this.onMoveUpClick}" class="chevron_button_hover" x="165" y="104" width="70" height="50" rx="15"></rect>
            <path @click="${this.onMoveUpClick}" class="chevron_button" d="M7.06,37.09L30.03,14.16l22.97,22.92,7.06-7.06L30.03,0,0,30.03l7.06,7.06Z" transform="translate(170, 110)"/>
        `;
    }

    /**
     * Render move target temperature down button
     * @returns svg
     */
    renderMoveDown() {
        if (!this.enable_move_buttons) return svg``;

        return svg`
            <rect @click="${this.onMoveDownClick}" class="chevron_button_hover" x="165" y="244" width="70" height="50" rx="15"></rect>
            <path @click="${this.onMoveDownClick}" class="chevron_button" d="M7.06,0L30.03,22.97,53,0l7.06,7.11-30.03,30.03L0,7.11,7.06,0Z" transform="translate(170, 250)"/>
        `;
    }
    /**
     * Render ticks on the circle
     * @returns svg
     */
    renderTicks() {
        let tickArray = [];

        var vMin, vMax;
        if (this.away) {
            vMin = this.ambient_temperature ?? this.min_value;
            vMax = vMin;
        } else {
            vMin = Math.min(this.ambient_temperature ?? this.min_value, this.target_temperature);
            vMax = Math.max(this.ambient_temperature ?? this.min_value, this.target_temperature);
        }
        var min = this.restrictToRange(
            Math.round(((vMin - this.min_value) / this.configuration.rangeValue) * this.numTicks),
            0,
            this.numTicks - 1
        );
        var max = this.restrictToRange(
            Math.round(((vMax - this.min_value) / this.configuration.rangeValue) * this.numTicks),
            0,
            this.numTicks - 1
        );

        for (let iTick = 0; iTick < this.numTicks; iTick++) {
            var isLarge = iTick == min || iTick == max;
            var isActive = iTick >= min && iTick <= max;

            tickArray.push(svg`
                <path
                    d="${this.pointsToPath(
                        this.rotatePoints(
                            isLarge ? this.tickPointsLarge : this.tickPoints,
                            iTick * this.theta - this.configuration.offsetDegrees,
                            [this.configuration.radius, this.configuration.radius]
                        )
                    )}"
                    class="${isActive ? "active" : ""}"
                ></path>`);
        }
        return tickArray;
    }

    /**
     * Render target temperature text
     * @returns svg
     */
    renderTargetTemperature() {
        return svg`
            <text
                x="${this.configuration.radius}"
                y="${this.configuration.radius * 1.17}"
                class="dial__lbl dial__lbl--target"
            >
                ${parseInt(this.target_temperature)}
            </text>
            <text
                x="${this.configuration.radius * 1.35}"
                y="${this.configuration.radius * 0.954}"
                class="dial__lbl dial__lbl--target--half ${this.target_temperature % 1 != 0 ? "shown" : ""}"
            >${this._targetTemperatureDecimal}</text>`;
    }

    /**
     * Renders current action icon
     * @returns svg
     */
    renderCurrentAction() {
        if (!this.enable_current_action) return svg``;

        // Off mode
        if (this.current_action == "off")
            return svg`
            <text x="${this.configuration.radius}" y="${this.configuration.radius * 0.47}">OFF</text>
            `;

        // Heat mode
        if (this.current_action == "heat")
            return svg`
            <path class="current_action ${
                this.action_active ? "current_action_active" : ""
            }" transform="translate(191, 76)" d="M16.3,10.55c-.3-.39-.66-.72-.99-1.05-.86-.77-1.84-1.32-2.66-2.14-1.92-1.88-2.34-4.98-1.12-7.36-1.22,.3-2.29,.96-3.2,1.7-3.33,2.68-4.64,7.4-3.07,11.45,.05,.13,.1,.26,.1,.42,0,.28-.19,.54-.45,.64-.3,.13-.6,.05-.85-.15-.08-.06-.13-.13-.18-.22-1.45-1.84-1.69-4.48-.71-6.59C1.02,9-.15,11.96,.02,14.75c.08,.64,.15,1.29,.37,1.93,.18,.77,.53,1.54,.91,2.23,1.39,2.23,3.79,3.82,6.38,4.14,2.75,.35,5.7-.15,7.81-2.06,2.35-2.14,3.18-5.56,1.97-8.49l-.17-.33c-.27-.59-.99-1.62-.99-1.62m-4.06,8.1c-.36,.31-.95,.64-1.41,.77-1.44,.51-2.88-.21-3.73-1.05,1.53-.36,2.44-1.49,2.71-2.64,.22-1.03-.19-1.88-.36-2.87-.15-.95-.13-1.76,.22-2.65,.24,.49,.5,.98,.81,1.36,.99,1.29,2.55,1.85,2.88,3.6,.05,.18,.08,.36,.08,.55,.04,1.05-.42,2.21-1.2,2.92h0Z"/>
        `;

        // Cool mode
        if (this.current_action == "cool")
            return svg` <path class="current_action ${
                this.action_active ? "current_action_active" : ""
            }" transform="translate(188, 76)" d="M20.79,13.95L18.46,14.57L16.46,13.44V10.56L18.46,9.43L20.79,10.05L21.31,8.12L19.54,7.65L20,5.88L18.07,5.36L17.45,7.69L15.45,8.82L13,7.38V5.12L14.71,3.41L13.29,2L12,3.29L10.71,2L9.29,3.41L11,5.12V7.38L8.5,8.82L6.5,7.69L5.92,5.36L4,5.88L4.47,7.65L2.7,8.12L3.22,10.05L5.55,9.43L7.55,10.56V13.45L5.55,14.58L3.22,13.96L2.7,15.89L4.47,16.36L4,18.12L5.93,18.64L6.55,16.31L8.55,15.18L11,16.62V18.88L9.29,20.59L10.71,22L12,20.71L13.29,22L14.7,20.59L13,18.88V16.62L15.5,15.17L17.5,16.3L18.12,18.63L20,18.12L19.53,16.35L21.3,15.88L20.79,13.95M9.5,10.56L12,9.11L14.5,10.56V13.44L12,14.89L9.5,13.44V10.56Z"/`;

        // Heat/cool mode
        if (this.current_action == "heat_cool")
            return svg`<path class="current_action ${
                this.action_active ? "current_action_active" : ""
            }" transform="translate(188, 76)" d="M12 .69L8.69 4H4V8.69L.69 12L4 15.31V20H8.69L12 23.31L13 22.31V17.83L16.24 21.07L17.66 19.66L13 15V13H15L19.66 17.66L21.07 16.24L17.83 13H22V11H17.83L21.07 7.76L19.66 6.34L15 11H13V9L17.66 4.34L16.24 2.93L13 6.17V1.69M11 6.09V8.13C9.24 8.59 8 10.18 8 12C8 13.82 9.24 15.41 11 15.87V17.91C8.12 17.42 6 14.93 6 12C6 9.07 8.11 6.57 11 6.09Z" />`;

        // Dry mode
        if (this.current_action == "dry")
            return svg`<path class="current_action ${
                this.action_active ? "current_action_active" : ""
            }" transform="translate(188, 76)" d="M8.5 4.5L5.4 9.5L8.5 14.7L5.2 20.5L3.4 19.6L6.1 14.7L3 9.5L6.7 3.6L8.5 4.5M14.7 4.4L11.6 9.5L14.7 14.5L11.4 20.3L9.6 19.4L12.3 14.5L9.2 9.5L12.9 3.5L14.7 4.4M21 4.4L17.9 9.5L21 14.5L17.7 20.3L15.9 19.4L18.6 14.5L15.5 9.5L19.2 3.5L21 4.4" />`;

        // Fan mode
        if (this.current_action == "fan")
            return svg`<path class="current_action ${
                this.action_active ? "current_action_active" : ""
            }" transform="translate(188, 76)" d="M12,11A1,1 0 0,0 11,12A1,1 0 0,0 12,13A1,1 0 0,0 13,12A1,1 0 0,0 12,11M12.5,2C17,2 17.11,5.57 14.75,6.75C13.76,7.24 13.32,8.29 13.13,9.22C13.61,9.42 14.03,9.73 14.35,10.13C18.05,8.13 22.03,8.92 22.03,12.5C22.03,17 18.46,17.1 17.28,14.73C16.78,13.74 15.72,13.3 14.79,13.11C14.59,13.59 14.28,14 13.88,14.34C15.87,18.03 15.08,22 11.5,22C7,22 6.91,18.42 9.27,17.24C10.25,16.75 10.69,15.71 10.89,14.79C10.4,14.59 9.97,14.27 9.65,13.87C5.96,15.85 2,15.07 2,11.5C2,7 5.56,6.89 6.74,9.26C7.24,10.25 8.29,10.68 9.22,10.87C9.41,10.39 9.73,9.97 10.14,9.65C8.15,5.96 8.94,2 12.5,2Z" />`;

        // Auto mode
        if (this.current_action == "auto")
            return svg`<text x="${this.configuration.radius}" y="${this.configuration.radius * 0.47}">AUTO</text>`;
    }

    /**
     * Renders current temperature and humidity
     * @returns svg
     */
    renderBottomStates() {
        return svg`
            <text
                x="${this.configuration.radius}"
                y="${this.configuration.radius * 1.7}"
                class="current_temperature dial__lbl"
            >
                ${this.current_temperature}
            </text>

            <text
                x="${this.configuration.radius}"
                y="${this.configuration.radius * 1.88}"
                class="current_humidity dial__lbl"
            >
                ${this.current_humidity ? this.current_humidity + ` %` : ``}
            </text>`;
    }

    /**
     * Render ambient label
     * @returns svg
     */
    renderAmbientLabel() {
        if (!this.enable_ambient_temperature || !this.ambient_temperature) return svg``;

        let peggedValue = this.restrictToRange(this.ambient_temperature, this.min_value, this.max_value);
        let deg =
            (this.configuration.tickDegrees * (peggedValue - this.min_value)) / this.configuration.rangeValue -
            this.configuration.offsetDegrees;
        if (peggedValue > this.target_temperature) {
            deg += 8;
        } else {
            deg -= 8;
        }
        let pos = this.rotatePoint(this.configuration.lblAmbientPosition, deg, [
            this.configuration.radius,
            this.configuration.radius,
        ]);

        return svg`
            <text class="dial__lbl dial__lbl--ambient" x="${pos[0]}" y="${pos[1]}">${Math.floor(
            this.ambient_temperature
        )} ${this.ambient_temperature % 1 != 0 ? "⁵" : ""}
            </text>`;
    }

    /**
     * Main render function, returns whole thermostat
     * @returns svg
     */
    renderSvg() {
        return svg`
            <svg
                width="100%"
                height="100%"
                class="dial dial--state--off"
                viewBox="0 0 ${this.diameter} ${this.diameter}"
                @pointermove="${this.onPointerMove}"
                @pointerdown="${this.onPointerDown}"
                @pointerup="${this.onPointerEnd}"
                @pointercancel="${this.onPointerEnd}"
            >
                ${this.renderCircle()}
                <g class="dial__ticks">${this.renderTicks()}</g>
                ${this.renderAmbientLabel()}

                ${this.renderTargetTemperature()}
                ${this.renderCurrentAction()}
                ${this.renderMoveUp()}
                ${this.renderMoveDown()}
                ${this.renderBottomStates()}
            </svg>`;
    }

    render() {
        return html` <div class="wrapper">${this.renderSvg()}</div> `;
    }

    /********************************************************************
     * Helper functions
     *******************************************************************/

    // Set attributes for an element
    attr(element, attrs) {
        for (var i in attrs) {
            element.setAttribute(i, attrs[i]);
        }
    }

    // Rotate a cartesian point about given origin by X degrees
    rotatePoint(point, angle, origin) {
        var radians = (angle * Math.PI) / 180;
        var x = point[0] - origin[0];
        var y = point[1] - origin[1];
        var x1 = x * Math.cos(radians) - y * Math.sin(radians) + origin[0];
        var y1 = x * Math.sin(radians) + y * Math.cos(radians) + origin[1];
        return [x1, y1];
    }

    // Rotate an array of cartesian points about a given origin by X degrees
    rotatePoints(points, angle, origin) {
        let rotatePoint = this.rotatePoint;
        return points.map(function (point) {
            return rotatePoint(point, angle, origin);
        });
    }

    // Given an array of points, return an SVG path string representing the shape they define
    pointsToPath(points) {
        return (
            points
                .map(function (point, iPoint) {
                    return (iPoint > 0 ? "L" : "M") + point[0] + " " + point[1];
                })
                .join(" ") + "Z"
        );
    }

    circleToPath(cx, cy, r) {
        return [
            "M",
            cx,
            ",",
            cy,
            "m",
            0 - r,
            ",",
            0,
            "a",
            r,
            ",",
            r,
            0,
            1,
            ",",
            0,
            r * 2,
            ",",
            0,
            "a",
            r,
            ",",
            r,
            0,
            1,
            ",",
            0,
            0 - r * 2,
            ",",
            0,
            "z",
        ]
            .join(" ")
            .replace(/\s,\s/g, ",");
    }

    donutPath(cx, cy, rOuter, rInner) {
        return this.circleToPath(cx, cy, rOuter) + " " + this.circleToPath(cx, cy, rInner);
    }

    // Restrict a number to a min + max range
    restrictToRange(val, min, max) {
        if (val < min) return min;
        if (val > max) return max;
        return val;
    }

    // Round a number to the nearest 0.5
    roundHalf(num) {
        return Math.round(num * 2) / 2;
    }
}

customElements.define(ELEMENT_TAG, ThermostatControl);
