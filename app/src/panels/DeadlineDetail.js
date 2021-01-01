import React from 'react';
import PropTypes from 'prop-types';
import { platform, IOS } from '@vkontakte/vkui';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import PanelHeaderButton from '@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

const osName = platform();

class DeadlineDetail extends React.Component{
	selected = -1

	render(){
		return <Panel id={this.props.id}>
			<PanelHeader
				left={<PanelHeaderButton onClick={this.props.go} data-to="home">
					{osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
				</PanelHeaderButton>}
			>
				{'это дедлайн №'+this.selected}
			</PanelHeader>
		</Panel>
	}
}

DeadlineDetail.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};

export default DeadlineDetail;
