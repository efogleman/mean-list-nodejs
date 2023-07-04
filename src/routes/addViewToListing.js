import { Boom, notFound } from "@hapi/boom";
import { db } from "../database";

export const addViewToListingRoute = {
    method: 'POST',
    path: '/api/listings/{id}/add-view',
    handler: async (req, h) => {
        const id = req.params.id;
        await db.query(
            'UPDATE listings SET views=views+1 WHERE id=?',
            [id],
        );
        const { results } = await db.query(
            'SELECT * FROM listings WHERE id=?',
            [id],
        );
        const updatedListing = results[0];
        if (!updatedListing) {
            throw notFound(`Listing does not exist with id ${id}`);
        }
        return updatedListing;
    }
};