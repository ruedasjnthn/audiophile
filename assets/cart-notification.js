class CartNotification extends HTMLElement {
    constructor() {
        super()

        this.notification = document.getElementById('cart-notification')

        this.querySelectorAll('button[type="button"]').forEach((closeButton) =>
            closeButton.addEventListener('click', this.close.bind(this))
        )
    }

    open() {
        this.notification.classList.remove('hidden')
    }

    close() {
        this.notification.classList.add('hidden')
    }

    renderContents(parsedState) {
        console.log(parsedState)
        const {
            product_title,
            image,
            final_price,
            quantity,
            options_with_values,
        } = parsedState
        const shortenTitle = product_title.split(' ').slice(0, -1).join(' ')
        this.querySelector('#cart-notif__title').innerHTML = shortenTitle
        this.querySelector('#cart-notif__img').src = image
        this.querySelector('#cart-notif__variant').innerHTML =
            options_with_values[0].value
        this.querySelector('#cart-notif__price').innerHTML =
            `$${Math.floor(final_price / 100).toLocaleString()}`
        this.querySelector('#cart-notif__quantity').innerHTML = `x${quantity}`
        this.open()
    }

    setActiveElement(element) {
        this.activeElement = element
    }
}

customElements.define('cart-notification', CartNotification)
