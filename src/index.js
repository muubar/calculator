import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class Calculator extends React.Component {
  handleClick = (e) => {
    const text = e.target.innerText;
    if (this.state.isResult) {
      if (['%', '/', '*', '-', '+'].includes(text)) {
        return this.setState((state) => ({ formula: `${state.formula}${text} `, val: '', isResult: false }))
      }
      else return this.setState({ formula: '', val: '', isResult: false });
    }

    else if (Number.isInteger(Number(text))) {
      if (this.state.val === '0' || this.state.val === '-0') {
        if (text === '0') return;
        else return this.setState((state) => ({ val: state.val[0] === '-' ? '-' + text : text }));
      }
      else return this.setState((state) => ({ val: state.val + text }));
    }

    else if (text === '.' && !this.state.val.includes('.')) {
      return this.setState((state) => ({ val: state.val.length === 0 ? '0.' : state.val + '.' }));
    }

    else if (text === 'del') {
      this.setState((state) => ({ val: state.val.substring(0, state.val.length - 1) }));
    }

    else if (text === '+/-' && this.state.val.length > 0 && this.state.val !== '0') {
      return this.setState((state) => ({ val: state.val[0] === '-' ? state.val.substring(1) : '-' + state.val }));
    }

    else if (text === 'AC') return this.setState({ formula: '', val: '' });

    else if (['%', '/', '*', '-', '+'].includes(text)) {
      if (this.state.val === '') return;
      const num = Number(this.state.val);
      if (Number.isNaN(num)) num = 0;
      this.setState((state) => ({ formula: `${state.formula}${String(num)} ${text} `, val: '' }));
    }

    else if (text === '=') {
      let num;
      if (this.state.val !== '') {
        num = Number(this.state.val);
        //if (Number.isNaN(num)) num = 0;
      }
      if (num === undefined && this.state.formula === '') return;
      this.setState((state) => ({
        formula: num === undefined ? String(eval(state.formula.substring(0, state.formula.length - 2))) : String(eval(`${state.formula}${String(num)}`)),
        val: '',
        isResult: true
      }))
    }
  }

  constructor() {
    super()
    this.state = { formula: '', val: '', isResult: false };
  }

  render() {
    return (
      <div className='calculator' >
        <Display curentFormula={this.state.formula} currentVal={this.state.val} />
        <Keypad onClick={this.handleClick} />
      </div>
    )
  }
}

function Display(props) {
  return (
    <div>
      <Formula className='display-elem' curentFormula={props.curentFormula} />
      <Input className='display-elem' currentVal={props.currentVal} />
    </div>
  )
}

function Keypad(props) {
  return (
    <div className='keypad' onClick={props.onClick}>
      <Key text='AC' />
      <Key text='+/-' />
      <Key text='%' />
      <Key text='/' className='operation-key' />
      <Key text='7' />
      <Key text='8' />
      <Key text='9' />
      <Key text='*' className='operation-key' />
      <Key text='4' />
      <Key text='5' />
      <Key text='6' />
      <Key text='-' className='operation-key' />
      <Key text='1' />
      <Key text='2' />
      <Key text='3' />
      <Key text='+' className='operation-key' />
      <Key text='0' />
      <Key text='.' />
      <Key text='del' />
      <Key text='=' className='operation-equal' />
    </div>
  );
}

function Input(props) {
  return (
    <input type="text" className={props.className} disabled value={props.currentVal}></input>
  )
}

function Formula(props) {
  return (
    <input type="text" className={props.className} disabled value={props.curentFormula}></input>
  )
}

function Key(props) {
  return (
    <button className={props.className}>{props.text}</button>
  )
}

ReactDOM.render(<Calculator />, document.getElementById('root'));