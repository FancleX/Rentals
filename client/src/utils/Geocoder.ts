import { Client, LatLngLiteral } from "@googlemaps/google-maps-services-js";
import { Exceptions } from "./Exceptions";

export default class GeoCoder extends Client {

    private readonly apiKey: string = process.env.REACT_APP_GOOGLE_MAP_API_KEY || '';

    constructor() {
        super();
    }

    /**
     * Get the coordinator queried address.
     * 
     * @param address address to be queried
     * @returns coordinator associate to the address
     */
    public async getCoordinates(address: string): Promise<LatLngLiteral> {
        try {
            const result = await this.geocode({
                params: {
                    address,
                    key: this.apiKey,
                }
            });
            const { status } = result.data;
            if (status === 'ZERO_RESULTS') {
                throw new Exceptions.ResourceNotFound(status.toLowerCase());
            }
            const { lng, lat } = result.data.results[0].geometry.location;
            return { lng, lat };
        } catch(error) {
            throw new Error(error);
        }
    }


    public async filterByRange(bounds: number) {

    }
}



