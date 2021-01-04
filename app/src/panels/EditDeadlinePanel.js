import React, { useState, useEffect } from 'react';
import '@vkontakte/vkui/dist/vkui.css';

import Panel from '@vkontakte/vkui/dist/components/Panel/Panel'

import Button from '@vkontakte/vkui/dist/components/Button/Button'
import { PanelHeader, Group, Cell, CellButton, FormLayout, Select } from '@vkontakte/vkui';
import FormField from '@vkontakte/vkui/dist/components/FormField/FormField'
import Input from '@vkontakte/vkui/dist/components/Input/Input'

import PropTypes from 'prop-types';
import { platform, IOS, ActionSheetItem, ActionSheet } from '@vkontakte/vkui';
import PanelHeaderButton from '@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

const osName = platform();

// takes props: id, deadlineName, deadlineDate, dealineTime, onSend - метод, который обрабатывает результаты формы
class EditDeadlinePannel extends React.Component{
	constructor(props) {
        super(props);
        
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeTime = this.onChangeTime.bind(this);
        this.onClickSave = this.onClickSave.bind(this);

    	this.state = {
            deadlineName: this.props.deadlineName,
            deadlineDate: this.props.deadlineDate,
            deadlineTime: this.props.deadlineTime,
		}
    }
    
	onChangeName(event){
		this.setState( {deadlineName: event.target.value} );
    }
    
    onChangeDate(event){
		this.setState( {deadlineDate: event.target.value} );
    }
    
    onChangeTime(event){
		this.setState( {deadlineTime: event.target.value} );
    }
    
    onClickSave(){
        this.props.onSend( {
            deadlineName: this.state.deadlineName,
            deadlineDate: this.state.deadlineDate,
            deadlineTime: this.state.deadlineTime
        } );
    }

    render(){
        return (
        <Panel id={this.props.id}>
            <PanelHeader 
                left={<PanelHeaderButton onClick={ () => this.props.onBack()}> 
                {osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
            </PanelHeaderButton>}>Новый дедлайн</PanelHeader>

            <Group>
				<FormLayout >
					<FormField top="Название">            
                		<Input placeholder="Название" onChange={this.onChangeName} value={this.state.deadlineName}/>
              		</FormField>
					<FormField top="День">            
                		<Input type='date' placeholder="День" onChange={this.onChangeDate} value={this.state.deadlineDate}/>
              		</FormField>
					<FormField top="Время">            
                		<Input type='time' placeholder="Воемя" onChange={this.onChangeTime} value={this.state.deadlineTime}/>
              		</FormField>
					<Button type="submit" onClick={this.onClickSave}>Сохранить</Button>
				</FormLayout>
			</Group>
        </Panel>);
    }
}

EditDeadlinePannel.propTypes = {
    id: PropTypes.string.isRequired,
    // Deadline's name, date and time. Write an empty string if creating a new deadline
    deadlineName: PropTypes.string.isRequired,
    deadlineDate: PropTypes.string.isRequired,
    deadlineTime: PropTypes.string.isRequired,
     // Function which handle form
    onSend: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
};

export default EditDeadlinePannel