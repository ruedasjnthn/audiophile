class QuantityInput extends HTMLElement {
    constructor() {
        super()
        this.input = this.querySelector('input')
        this.changeEvent = new Event('change', { bubbles: true })

        this.querySelectorAll('button').forEach((button) =>
            button.addEventListener('click', this.onButtonClick.bind(this))
        )
    }

    onButtonClick(event) {
        event.preventDefault()
        const previousValue = this.input.value

        event.target.name === 'plus'
            ? this.input.stepUp()
            : this.input.stepDown()
        if (previousValue !== this.input.value)
            this.input.dispatchEvent(this.changeEvent)
    }
}

customElements.define('quantity-input', QuantityInput)

const serializeForm = (form) => {
    const obj = {}
    const formData = new FormData(form)

    for (const key of formData.keys()) {
        const regex = /(?:^(properties\[))(.*?)(?:\]$)/

        if (regex.test(key)) {
            obj.properties = obj.properties || {}
            obj.properties[regex.exec(key)[2]] = formData.get(key)
        } else {
            obj[key] = formData.get(key)
        }
    }

    return JSON.stringify(obj)
}

function fetchConfig(type = 'json') {
    return {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: `application/${type}`,
        },
    }
}
