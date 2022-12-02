import blessed from "blessed"
export default function replStart() {
    let screen = blessed.screen({
        smartCSR: true
    });

    let formBox = blessed.box({
        parent: screen,
        bottom: 0,
        left: 0,
        width: '100%',
        height: 1,
        content: ">",
        style: {
            bg: "white"
        },
        tags: true,
      })

    let form = blessed.form({
        //parent: formBox,
        tags: true,
        style: {
            bg: "magenta"
        }
    });

    let textbox = blessed.textbox({
        parent: form,
        width: "100%",
        height: "100%",
        lablel: ">",
        inputOnFocus : true,
    })

    let logger = blessed.log({
        parent: screen,
        bottom: 1,
        left: 0,
        width: '100%',
        height: '100%-1',
        tags: true,
    });
    
    // Quit on Control-C.
    screen.key('C-c', function(ch, key) {
        return process.exit(0);
    });


    screen.render();
}