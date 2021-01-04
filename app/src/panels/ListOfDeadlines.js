import React from 'react';
import PropTypes from 'prop-types';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';

import '../styles/description.css';

// Takes props: elements, onSelect (function takes Deadline)
class ListOfDeadlines extends React.Component{
    constructor(props){
        super(props);

        this.getLovelyTime = this.getLovelyTime.bind(this);

		let time = new Date();

        this.setState({
            time: time,
		});
		
		this.selectStyle = this.selectStyle.bind(this);
		this.selectEmoji = this.selectEmoji.bind(this);
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

	selectStyle(deadline){
		if(deadline.ticked == true){
			return 'ticked';
		}

		if(deadline.occur - new Date() < 0){
			return 'missed'
		}
		else{
			return ''
		}
	}

	selectEmoji(deadline){
		if(deadline.ticked == true){
			return '✅';
		}

		if(deadline.occur - new Date() < 0){
			return '❌'
		}
		else{
			return ''
		}
	}

    render(){
        let array = this.props.elements;

        let cells = array.map(e => 
			<Cell onClick={ () => { this.props.onChoose(e); } }
				key={array.indexOf(e)} description={this.getLovelyTime(e.occur)}>
				<div className={this.selectStyle(e)}>{this.selectEmoji(e) + e.name}</div>
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