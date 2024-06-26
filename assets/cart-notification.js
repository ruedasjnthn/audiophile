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
        const { product_title, image, final_price, quantity } = parsedState
        const shortenTitle = product_title.split(' ').slice(0, -1).join(' ')
        document.getElementById('cart-notif__title').innerHTML = shortenTitle
        document.getElementById('cart-notif__img').src = image
        document.getElementById('cart-notif__price').innerHTML =
            `$${Math.floor(final_price / 100).toLocaleString()}`
        document.getElementById('cart-notif__quantity').innerHTML =
            `x${quantity}`
        this.open()
    }

    setActiveElement(element) {
        this.activeElement = element
    }
}

customElements.define('cart-notification', CartNotification)
