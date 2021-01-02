import React from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import './Deadline.css';

import DeadlineDetail from './DeadlineDetail'

// Takes props: elements, onSelect (function takes Deadline)
class ListOfDeadlines extends React.Component{
    constructor(props){
        super(props);

        this.getLovelyTime = this.getLovelyTime.bind(this);

        this.setState({
            time: new Date(),
        });
    }

    // Установка интервального таймера
	componentDidMount() {
		this.interval = setInterval(() => this.tick(), 1000);
	}

    // Сброс интервального таймера
	componentWillUnmount() {
		clearInterval(this.interval);
	}

    // Каждый тик всех часов
	tick() {
		this.setState({
		    time: new Date(),
		});
	}

    // Принимает дату типа Date и возвращает количество дней в вде строки
	getLovelyTime(date){
        // Колличество секунд между датами
		let dif = Math.floor((date - new Date())/1000);

		if(dif <= 0){
			return 'Дедлайн настал!'
		}
		
		let sec = dif % 60;
		dif = Math.floor(dif / 60); // Теперь колличество минут между датами

		let min = dif % 60;
		dif = Math.floor(dif / 60); // Теперь колличество часов между датами

		let hours = dif % 24;
		dif = Math.floor(dif / 24); // Теперь количество дней

		return dif + 'д. ' + hours + 'ч. ' + min + 'м. ' + sec + 'с.';
	}

    render(){
        let array = this.props.elements;

        let cells = array.map(e => 
			<Cell onClick={ () => {this.props.onChoose(e)} }
				key={array.indexOf(e)} description={this.getLovelyTime(e.occur)}>
				{e.name}
			</Cell>
        );

        return (<Group>{cells}</Group>);
    }
}

ListOfDeadlines.propTypes = {
    elements: PropTypes.any.isRequired,
    // Function which handle selected item
    onChoose: PropTypes.func.isRequired,
};

export default ListOfDeadlines;