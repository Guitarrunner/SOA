
import React from "react";


export class StarWarsCharacters extends React.Component {
    render() {
        if (!this.props.characters) {
            return <></>;
        }
        return (
            <table>

                {this.props.characters.map(e => 
                    <tr>
                        <td>{e.name}</td>
                        <td>{e.height}</td>
                    </tr>)}
                <tr></tr>
            </table>
        );
    }
}