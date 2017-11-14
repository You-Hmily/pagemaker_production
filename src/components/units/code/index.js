import './index.scss'
// import 'codemirror/lib/codemirror.css'
// import 'codemirror/theme/monokai.css'

import React, {PropTypes} from 'react'
import autoBind from 'autobind-decorator'
import pureRender from 'pure-render-decorator'
import ImmutablePropTypes from 'react-immutable-proptypes'

import CodeMirror from 'CodeMirror'
// import js from 'codemirror/mode/javascript/javascript.js'
// import css from 'codemirror/mode/css/css.js'

import unitAction from '../../../action/unit';
import UnitPanel from '../panel/index';

@pureRender
class UnitCode extends React.Component {
    static propTypes = {
        data: ImmutablePropTypes.map,
        id: PropTypes.number
    }
    constructor(props) {
        super(props);
    }
    render() {
        const {data, id} = this.props;
        return (
            <UnitPanel id={id} type={data.get('type').toLowerCase()} unitName={data.get('name')}>
                <ul>
                    <li className="f-cb">
                        <label className="f-fl">样式(CSS)</label>
                        <ul ref="cssdiv" className="css-input f-fr"></ul>
                    </li>
                    <li className="f-cb">
                        <label className="f-fl">脚本(JS)</label>
                        <ul ref="jsdiv" className="js-input f-fr"></ul>
                    </li>
                    <li className="f-cb">
                        <button className="f-fl" onClick={(e) => this.saveCode(e)}>保存编辑</button>
                    </li>
                </ul>
                
                
                
            </UnitPanel>
        );
    }
    saveCode(e) {
        const {id} = this.props;
        unitAction.editUnit(id, 'js', this.jsCodeMirror.getValue());
        unitAction.editUnit(id, 'css', this.cssCodeMirror.getValue());
    }
    componentDidMount() {
        const {data} = this.props;
        this.jsCodeMirror = CodeMirror(this.refs.jsdiv, {
            value: data.get('js'),
            mode: "javascript",
            lineNumbers: true,
            theme: 'monokai'
        });
        this.cssCodeMirror = CodeMirror(this.refs.cssdiv, {
            value: data.get('css'),
            mode: "css",
            lineNumbers: true,
            theme: 'monokai'
        });
    }
}

export default UnitCode;
