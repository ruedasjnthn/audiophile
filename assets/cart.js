class CartItems extends HTMLElement {
    constructor() {
        super()

        this.debouncedOnChange = debounce((event) => {
            this.onChange(event)
        }, 300)

        this.addEventListener('change', this.debouncedOnChange.bind(this))
        this.querySelector('#remove-btn').addEventListener(
            'click',
            this.onCartDelete.bind(this)
        )
    }

    onChange(event) {
        this.updateQuantity(event.target.dataset.index, event.target.value)
    }

    onCartUpdate() {
        fetch(`${window.Shopify.routes.root}?section_id=main-cart`)
            .then((response) => response.text())
            .then((responseText) => {
                const html = new DOMParser().parseFromString(
                    responseText,
                    'text/html'
                )
                const targetElement = document.querySelector('cart-items')
                const sourceElement = html.querySelector('cart-items')
                if (targetElement && sourceElement) {
                    targetElement.replaceWith(sourceElement)
                }
            })
            .catch((e) => {
                console.error(e)
            })
    }

    onCartDelete() {
        const config = fetchConfig('javascript')
        config.headers['X-Requested-With'] = 'XMLHttpRequest'
        delete config.headers['Content-Type']
        fetch(`${window.Shopify.routes.root}cart/clear.js`, config)
            .then(() => this.onCartUpdate())
            .catch((e) => {
                console.error(e)
            })
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
            .then(() => {
                this.onCartUpdate()
            })
            .catch((err) => console.log(err))
    }
}

customElements.define('cart-items', CartItems)
