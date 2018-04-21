import React, { Component } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Switch, withRouter } from 'react-router';
import PropTypes from 'prop-types';
import './style.scss';

const HISTORIES_KEY = 'HISTORIES_KEY';
const histories = (sessionStorage.getItem(HISTORIES_KEY) || '').split(',').filter(Boolean);
let timer;
const isHistoryPush = location => {
    const index = histories.lastIndexOf(location.key);

    clearTimeout(timer);

    timer = setTimeout(function() {
        if (index > -1) {
            histories.splice(index + 1);
        } else {
            histories.push(location.key);
        }

        sessionStorage.setItem(TIGER_HISTORIES_KEY, histories.join(','));
    }, 50);

    return index < 0;
};

@withRouter
class PageAnimation extends Component {
    static propTypes = {
        className: PropTypes.string,
        transitionKey: PropTypes.any
    };

    render() {
        const { className, location, children } = this.props;
        const classNames = isHistoryPush(location) ? 'page-animation-enter' : 'page-animation-exit';

        return (
            <TransitionGroup
                className={'page-animation-container' + (className ? ' ' + className : '')}
                childFactory={child =>
                    React.cloneElement(child, {
                        classNames
                    })
                }>
                <CSSTransition key={this.props.transitionKey || location.pathname} timeout={300}>
                    <Switch location={location}>{children}</Switch>
                </CSSTransition>
            </TransitionGroup>
        );
    }
}

export default PageAnimation;
