const chai = require('chai');
const expect = chai.expect;

const Vampire = require('../vampire.js');

describe("Vampire", function() {

  let rootVampire;
  beforeEach(function() {
    rootVampire = new Vampire("root");
  });
  
  describe("#addOffspring", () => {

    context("when vampires get added as offspring of another vampire", function() {
      let offspring1;
      let offspring2;
      beforeEach(() => {
        offspring1 = new Vampire("andrew");
        offspring2 = new Vampire("sarah");
        rootVampire.addOffspring(offspring1);
        rootVampire.addOffspring(offspring2);
      });

      it("should be the offspring of that vampire", () => {
        expect(rootVampire.offspring[0]).to.equal(offspring1);
        expect(rootVampire.offspring[1]).to.equal(offspring2);
      });
      
      it("should have that vampire as it's creator", () => {
        expect(offspring1.creator).to.equal(rootVampire);
        expect(offspring2.creator).to.equal(rootVampire);
      });
    });

  });

  describe("numberOfOffspring", () => {

    it("should get the correct number of offspring", () => {
      expect(rootVampire.numberOfOffspring).to.equal(0);
      rootVampire.addOffspring(new Vampire());
      expect(rootVampire.numberOfOffspring).to.equal(1);
      rootVampire.addOffspring(new Vampire());
      rootVampire.addOffspring(new Vampire());
      rootVampire.addOffspring(new Vampire());
      rootVampire.addOffspring(new Vampire());
      expect(rootVampire.numberOfOffspring).to.equal(5);
    });
  });

  describe("numberOfVampiresFromOriginal", () => {

    let offspring1, offspring2, offspring3, offspring4;
    before(() => {
      offspring1 = new Vampire();
      offspring2 = new Vampire();
      offspring3 = new Vampire();
      offspring4 = new Vampire();

      rootVampire.addOffspring(offspring1);
      offspring1.addOffspring(offspring2);
      offspring2.addOffspring(offspring3);
      offspring3.addOffspring(offspring4);
    })
    
    it("root should be 0 from original", () => {
      expect(rootVampire.numberOfVampiresFromOriginal).to.equal(0);
    });

    it("offspring 1 should be 1 from original", () => {
      expect(offspring1.numberOfVampiresFromOriginal).to.equal(1);
    });

    it("offspring 2 should be 2 from original", () => {
      expect(offspring2.numberOfVampiresFromOriginal).to.equal(2);
    });

    it("offspring 4 should be 4 from original", () => {
      expect(offspring4.numberOfVampiresFromOriginal).to.equal(4);
    });
  });

  describe("moreSeniorVampire", () => {

    let offspring1, offspring2, offspring3, offspring4;
    beforeEach(() => {
      offspring1 = new Vampire();
      offspring2 = new Vampire();
      offspring3 = new Vampire();
      offspring4 = new Vampire();

      rootVampire.addOffspring(offspring1);
      rootVampire.addOffspring(offspring2);
      rootVampire.addOffspring(offspring3);
      offspring3.addOffspring(offspring4);
    });

    it("original should be more senior", () => {
      expect(rootVampire.isMoreSeniorThan(offspring1)).to.equal(true);
      expect(rootVampire.isMoreSeniorThan(offspring2)).to.equal(true);
      expect(rootVampire.isMoreSeniorThan(offspring3)).to.equal(true);
      expect(rootVampire.isMoreSeniorThan(offspring4)).to.equal(true);

      expect(offspring1.isMoreSeniorThan(rootVampire)).to.equal(false);
      expect(offspring2.isMoreSeniorThan(rootVampire)).to.equal(false);
      expect(offspring3.isMoreSeniorThan(rootVampire)).to.equal(false);
      expect(offspring4.isMoreSeniorThan(rootVampire)).to.equal(false);
    });

    it("offspring 3 should be more senior", () => {
      expect(offspring3.isMoreSeniorThan(offspring4)).to.equal(true);
      expect(offspring4.isMoreSeniorThan(offspring3)).to.equal(false);
    });

  });

  describe("closestCommonAncestor", function() {

    let offspring1, offspring2, offspring3, offspring4, offspring5, offspring6, offspring7, offspring8;
    beforeEach(() => {
      offspring1 = new Vampire("a");
      offspring2 = new Vampire("b");
      offspring3 = new Vampire("c");
      offspring4 = new Vampire("d");
      offspring5 = new Vampire("e");
      offspring6 = new Vampire("f");
      offspring7 = new Vampire("g");
      offspring8 = new Vampire("h");

      rootVampire.addOffspring(offspring1);
      rootVampire.addOffspring(offspring2);
      rootVampire.addOffspring(offspring3);
      offspring3.addOffspring(offspring4);
      offspring3.addOffspring(offspring5);
      offspring5.addOffspring(offspring6);
      offspring6.addOffspring(offspring7);
      offspring2.addOffspring(offspring8);
    });

    it("should be the root vampire for any vampire and the root vampire", () => {
      expect(rootVampire.closestCommonAncestor(offspring2).name).to.equal(rootVampire.name);
      expect(rootVampire.closestCommonAncestor(offspring7).name).to.equal(rootVampire.name);
    })

    it("should be the root vampire for first two offspring", () => {
      expect(offspring1.closestCommonAncestor(offspring2).name).to.equal(rootVampire.name);
    })

    it("should be offspring 3 for offspring 4 and 7", () => {
      expect(offspring4.closestCommonAncestor(offspring7).name).to.equal(offspring3.name);
      expect(offspring7.closestCommonAncestor(offspring4).name).to.equal(offspring3.name);
    })

    it("should be that vampire if same vampire is used", () => {
      expect(offspring4.closestCommonAncestor(offspring4).name).to.equal(offspring4.name);
    })

    it("should be the more senior vampire if a direct ancestor is used", () => {
      expect(offspring6.closestCommonAncestor(offspring7).name).to.equal(offspring6.name);
      expect(offspring7.closestCommonAncestor(offspring6).name).to.equal(offspring6.name);
    })

    it("should be root for offspring 8 and offspring 7", () => {
      expect(offspring7.closestCommonAncestor(offspring8).name).to.equal(rootVampire.name);
      expect(offspring8.closestCommonAncestor(offspring7).name).to.equal(rootVampire.name);
    })
  });
});