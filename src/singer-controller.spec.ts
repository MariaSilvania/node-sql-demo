import * as chai from "chai";
import * as restify from "restify";
import * as sinon from "sinon";
import { ArtistController, ArtistDao } from "./artist-controller";

chai.should();

describe("ArtistController", () => {
	describe("insertArtist", () => {
		it("should store the artist that was received in the body ", async () => {
			// ARRANGE
			const mockArtistDao = sinon.createStubInstance(ArtistDao);
			const controller = new ArtistController(mockArtistDao);

			const req = {
				body: {
					title: "Metallica",
					description: "The best band ever...besides Megadeth",
					year: 1986,
					genre: "Thrash Metal",
				},
			};

			const res = {
				send: sinon.stub(),
			};

			const next = sinon.stub() as any;

			// ACT
			await controller.insertArtist(req as restify.Request, res as any, next);

			// ASSERT
			mockArtistDao.insert.called.should.equal(true);
			res.send.calledWith(200).should.equal(true);
			next.called.should.equal(true);
		});
	});
});
