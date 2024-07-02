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

class VariantSelects extends HTMLElement {
    constructor() {
        super()
    }

    connectedCallback() {
        this.querySelectorAll('#options')[0].classList.add(
            'ring-1',
            'ring-black',
            'ring-offset-2'
        )
        this.querySelectorAll('input[type="radio"]')[0].checked = true
        this.querySelectorAll('input[type="radio"]').forEach((radio) => {
            radio.addEventListener('change', this.updateSwatch.bind(this))
        })
    }

    updateSwatch(event) {
        const radioButtons = this.querySelectorAll('input[type="radio"]')
        const options = this.querySelectorAll('#options')
        const variantDataElement = JSON.parse(
            this.querySelector(`script[type="application/json"]`).textContent
        ).find((variant) => variant.title === event.target.value)

        radioButtons.forEach((radio, index) => {
            if (radio.value === event.target.value) {
                radio.checked = true
                options[index].classList.add(
                    'ring-1',
                    'ring-black',
                    'ring-offset-2'
                )
            } else {
                radio.checked = false
                options[index].classList.remove(
                    'ring-1',
                    'ring-black',
                    'ring-offset-2'
                )
            }
        })
        this.querySelector('#variant-name').innerHTML =
            `Color: ${event.target.value}`
        document.querySelector('#variant-input-id').value =
            variantDataElement.id
    }
}

customElements.define('variant-selects', VariantSelects)

function fetchConfig(type = 'json') {
    return {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: `application/${type}`,
        },
    }
}

function debounce(fn, wait) {
    let t
    return (...args) => {
        clearTimeout(t)
        t = setTimeout(() => fn.apply(this, args), wait)
    }
}
