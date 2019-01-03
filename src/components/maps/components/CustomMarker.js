import React from 'react';
import { Container } from 'styled-container-component';
import { Button } from 'styled-button-component';
import {
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverHeader,
} from 'styled-popover-component';
import { Link } from 'react-router-dom'


export default class CustomMarker extends React.Component {
    constructor(props) {
        super();
        this.state = {
            top: 0,
            left: 0,
            hidden: true,
        };
    }

    handleModal(ev) {
        this.setState({
            top: ev.target.offsetTop - ev.target.offsetHeight,
            left: ev.target.offsetLeft + ev.target.offsetWidth,
            hidden: !this.state.hidden,
        });
    }

    render() {
        const {
            top,
            left,
            hidden,
        } = this.state;
        return (
            <Container>
                <Button
                    danger
                    onClick={(ev) => this.handleModal(ev)}
                >
                    {this.props.id}
                </Button>
                <Popover
                    hidden={hidden}
                    style={{
                        top: `${top}px`,
                        left: `${left}px`
                    }}
                    right
                >
                    <PopoverArrow right />
                    <PopoverHeader style={{ fontSize: '12px' }} right>
                        <Link to={`/orders/${this.props.id}`}>{this.props.id}</Link>
                        {'\n' + this.props.header}
                    </PopoverHeader>
                    <PopoverBody style={{ fontSize: '10px' }} right>{this.props.body}</PopoverBody>
                </Popover>
            </Container>
        );
    }
};