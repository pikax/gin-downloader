/**
 * Created by pikax on 08/07/2017.
 */

import gin from "src/index";

describe("get mangas", () => {

  it("should", async () => {
    await gin.batoto.login("", "");
    const images = await gin.batoto.images("Gintama", "100");

    console.log(images);
    return images;

  });

});


import "./common";
