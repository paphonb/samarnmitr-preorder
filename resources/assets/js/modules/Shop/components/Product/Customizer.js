import React  from 'react'
import { withLocalize } from 'react-localize-redux'

const normal = 'product-option-btn'
const active = normal + ' active'

export default withLocalize(({ translate, name, value, values, onChange }) => {
    if (!values) return null
    return (
        <div className="form-group row">
            <label className="col-4 col-form-label product-customization-label">
                { translate('shop.customizations.' + name + '.title') }
            </label>
            <div className="col-8">
                <div className="btn-group" role="group">
                    { values.map((each, i) => (
                        <button key={i} type="button" className={each.name === value ? active : normal} onClick={() => {
                            onChange(name, each.name)
                        }}>{ translate('shop.customizations.' + name + '.values.' + each.name) }</button>
                    )) }
                </div>
            </div>
        </div>
    )
})
