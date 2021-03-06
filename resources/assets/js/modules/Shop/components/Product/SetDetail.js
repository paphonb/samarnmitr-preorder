import React, { Component } from 'react'
import { withLocalize } from 'react-localize-redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { addItem } from '../../store/actions'

import DropdownCustomizer from './DropdownCustomizer'
import routes from '../../../../routes/routes'
import { getImage } from '../../shopUtils'
import ProductSlide from './ProductSlide'

class SetDetail extends Component {

    constructor(props) {
        super(props)
        this.state = {
            amount: 1,
            customizations: this.getInitialCustomizations(),
        }
        this.handleCustomizationChange = this.handleCustomizationChange.bind(this)
        this.handleAmountChange = this.handleAmountChange.bind(this)
        this.addToCart = this.addToCart.bind(this)
    }

    getInitialCustomizations() {
        return this.props.product.contents.map(content => {
            return {
                pivotId: content.pivot.id,
                values: content.customizations.reduce((acc, curr) => {
                    return {
                        ...acc,
                        [curr.name]: curr.default.name,
                    }
                }, {}),
            }
        })
    }

    handleCustomizationChange(index, name) {
        return e => {
            e.preventDefault()
            const value = e.target.value
            this.setState({ customizations: this.setCustomization(index, name, value) })
        }
    }

    setCustomization(index, name, value) {
        return this.state.customizations.map((it, i) => {
            if (i === index) {
                return {
                    pivotId: it.pivotId,
                    values: {
                        ...it.values,
                        [name]: value,
                    },
                }
            } else {
                return it
            }
        })
    }

    getCustomization(index, name) {
        return this.state.customizations[index].values[name]
    }

    handleAmountChange(amount) {
        this.setState({ amount })
    }

    addToCart() {
        const { product, history } = this.props
        const { customizations } = this.state
        const info = {
            id: product.id,
            customizations,
        }
        this.props.addItem(info, 1)
        history.push(routes.shop.cart.get())
    }

    renderContent(content, i) {
        return (
            <div key={i} className="product-preview-container">
                <div className="product-preview">
                    <div className="product-info-container">
                        <div className="product-pic">
                            <img className="fit-parent" src={getImage(content.id)} />
                        </div>
                        <div className="set-panel justify-content-between">
                            <h2 className="product-name">{ content.name }</h2>
                            <form className="form-inline">
                                { content.customizations.map((customization, j) => {
                                    return <DropdownCustomizer key={j} customization={customization}
                                        value={this.getCustomization(i, customization.name)}
                                        onChange={this.handleCustomizationChange(i, customization.name)} />
                                }) }
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        const { translate } = this.props
        const product = this.props.product
        return (
            <div className="set-detail-card">
                <div className="strip hide-mobile">
                    <div className="set-panel">
                        <h1>{ product.name }</h1>
                    </div>
                </div>
                <div className="set-image-container">
                    <ProductSlide product={product} hasMobile hasRetina />
                </div>
                <div className="strip hide-desktop">
                    <div className="set-panel">
                        <h1>{ product.name }</h1>
                    </div>
                </div>
                <div className="strip hide-mobile">
                    <div className="right-panel">
                        <h1>{ translate('shop.set_price_thb', { price: product.price }) }</h1>
                        <button className="btn btn-lg btn-danger"
                                onClick={this.addToCart}>{ translate('shop.addToCart') }</button>
                    </div>
                </div>
                <h1 className="customize-title">{ translate('shop.customize_bundle') }</h1>
                <div className="customizations">
                    { product.contents.map((content, i) => {
                        return this.renderContent(content, i)
                    }) }
                </div>
                <div className="bottom-strip hide-desktop">
                    <div className="set-price-container">
                        <h1 className="set-price-title">{ translate('shop.set_price') }</h1>
                        <h1>{ translate('shop.price_thb', { price: product.price }) }</h1>
                    </div>
                    <div className="set-panel justify-content-stretch">
                        <button className="btn btn-lg btn-danger btn-responsive"
                                onClick={this.addToCart}>{ translate('shop.addToCart') }</button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = () => ({})

const mapDispatchToProps = {
    addItem
}

export default withLocalize(withRouter(connect(mapStateToProps, mapDispatchToProps)(SetDetail)))
