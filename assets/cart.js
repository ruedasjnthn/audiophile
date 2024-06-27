class CartItems extends HTMLElement {
    constructor() {
        super()

        this.debouncedOnChange = debounce((event) => {
            this.onChange(event)
        }, 300)

        this.addEventListener('change', this.debouncedOnChange.bind(this))
    }

    onChange(event) {
        this.updateQuantity(event.target.dataset.index, event.target.value)
    }

    updateQuantity(line, quantity) {
        const body = JSON.stringify({
            line,
            quantity,
        })

        fetch(window.Shopify.routes.root + 'cart/change.js', {
            ...fetchConfig(),
            ...{ body },
        })
            .then((response) => {
                return response.text()
            })
            .then((state) => {
                const { item_count, total_price, items } = JSON.parse(state)
                document.getElementById('cart__item-count').innerHTML =
                    item_count
                document.getElementById('cart__total-price').innerHTML =
                    `$${Math.floor(total_price / 100).toLocaleString()}`
                if (Number(quantity) === 0) {
                    document.getElementById(`cart-item-${line}`).remove()
                    console.log(quantity === 0)
                }
            })
            .catch((err) => console.log(err))
    }
}

customElements.define('cart-items', CartItems)
