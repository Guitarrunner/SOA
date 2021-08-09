export class StarWarsClient{
    async getStarWarsData(){
        const rawResponse = await fetch("https://swapi.dev/api/people");
        const parseResponse = await rawResponse.json();
        return parseResponse.results;
    }
}