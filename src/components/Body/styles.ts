import styled from 'styled-components'

interface iProps {
	height?: string
}

export const Container = styled.div<iProps>`
	min-width: 100vw;
	box-sizing: border-box;
`

export const Div = styled.div<iProps>`
	background: url('../background.jpg');
	min-height: (${props => props.height ?? '105vh'});
	background-repeat: no-repeat;
	background-size: cover;
`