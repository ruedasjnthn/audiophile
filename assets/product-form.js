if (!customElements.get('product-form')) {
    customElements.define(
        'product-form',
        class ProductForm extends HTMLElement {
            constructor() {
                super()

                this.form = this.querySelector('form')
                this.form.addEventListener(
                    'submit',
                    this.onSubmitHandler.bind(this)
                )
                this.cartNotification =
                    document.querySelector('cart-notification')
            }

            onSubmitHandler(evt) {
                evt.preventDefault()
                this.cartNotification.setActiveElement(document.activeElement)

                const submitButton = this.querySelector('[type="submit"]')

                submitButton.setAttribute('disabled', true)

                const config = fetchConfig('javascript')
                config.headers['X-Requested-With'] = 'XMLHttpRequest'
                delete config.headers['Content-Type']

                const formData = new FormData(this.form)
                config.body = formData
                fetch(window.Shopify.routes.root + 'cart/add.js', config)
                    .then((response) => {
                        return response.json()
                    })
                    .then((parsedState) => {
                        console.log(parsedState)
                        this.cartNotification.renderContents(parsedState)
                    })
                    .catch((e) => {
                        console.error(e)
                    })
                    .finally(() => {
                        submitButton.removeAttribute('disabled')
                    })
            }
        }
    )
}
