importScripts('peggyParser.js');

onmessage = function (e) {
    console.log('worker start');

    // console.log(StartRules);
    // console.log(SyntaxError);
    // console.log(parse);

    const { input } = e.data;

    console.log("INPUT LENGTH: " + input.length);

    navigator.storage.getDirectory();

    try {
        let result = parse(input, {
            reportProgress(pos) {
                postMessage({
                    percentage: pos / input.length
                });
            }
        });

        // result = {
        //     meta_data: result.meta_data,
        //     playthrough_id: result.playthrough_id,
        //     traits_lookup: result.traits_lookup,
        //     currently_played_characters: result.currently_played_characters,
        //     living: result.living,
        // }

        console.log(result);

        writeSavefile(result.playthrough_id, result);

        this.postMessage({
            percentage: 1,
            result
        });
    } catch (err) {
        console.log(err);
        console.log(err.location);
    }

    // const result = parse(input, {
    //     error: function(stage, message, location, notes) {
    //         debugger;
    //     }
    // });
    // console.log(result);
}

async function writeSavefile(name, savefile) {
    const root = await navigator.storage.getDirectory();
    const savefileHandle = await root.getFileHandle(name, { create: true });
    const writeable = await savefileHandle.createWritable();
    await writeable.write({
        type: 'write',
        data: JSON.stringify(savefile)
    });
    await writeable.close();
}