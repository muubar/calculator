import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Calculator() {
  return (
    <div className='calculator'>
      <Display />
      <Keypad />
    </div>
  )
}

class Display extends React.Component {
  constructor(props) {
    super(props);
    this.name = "test";
  }
  render() {
    return (
      <div>
        <Formula className='display-elem' />
        <Input className='display-elem' />
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