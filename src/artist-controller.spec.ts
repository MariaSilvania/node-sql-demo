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

		it("deve rejeitar entradas sem o título preenchido", async () => {
			// ARRANGE
			const mockArtistDao = sinon.createStubInstance<ArtistDao>(ArtistDao);
			const controller = new ArtistController(mockArtistDao);

			const req = {
				body: {
					title: "",
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
			mockArtistDao.insert.called.should.equal(false);
			res.send.calledWith(400).should.equal(true);
			next.called.should.equal(true);
		});

		it("deve rejeitar entradas com o título vazio", async () => {
			// ARRANGE
			const mockArtistDao = sinon.createStubInstance<ArtistDao>(ArtistDao);
			const controller = new ArtistController(mockArtistDao);

			const req = {
				body: {
					title: "   ",
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
			mockArtistDao.insert.called.should.equal(false);
			res.send.calledWith(400).should.equal(true);
			next.called.should.equal(true);
		});

		async function testBody(body: object) {
			// ARRANGE
			const mockArtistDao = sinon.createStubInstance<ArtistDao>(ArtistDao);
			const controller = new ArtistController(mockArtistDao);

			const req = {
				body,
			};

			const res = {
				send: sinon.stub(),
			};

			const next = sinon.stub() as any;

			// ACT
			await controller.insertArtist(req as restify.Request, res as any, next);

			// ASSERT
			mockArtistDao.insert.called.should.equal(false);
			res.send.calledWith(400).should.equal(true);
			next.called.should.equal(true);
		}

		it("deve rejeitar entradas invalidas", async () => {
			await testBody({
				title: "teste",
				description: "teste",
				year: -1,
				genre: " ",
			});

			await testBody({
				title: null,
				description: null,
				year: -1,
				genre: null,
			});

			await testBody({
				title: undefined,
				description: -1,
				year: "asd",
				genre: new Date(),
			});
		});
	});
});
