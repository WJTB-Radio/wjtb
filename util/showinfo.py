import csv

ENTRY = """<div class="show">
    <img src="../img/shows/PICTURE" alt="">
    <div class="show_desc">
        <div class="all_inline">
            <h3 class="h3_alt">{}</h3>
            <p>&nbsp;&nbsp;&nbsp;hosted by <b>{}</b></p>
        </div>
        <p class="subsubtext">{}</p>
        <p class="pfix">
            {}<br>
            {}
        </p>
    </div>
</div>

<br><br>"""

with open("shows.tsv", 'r') as shows_tsv, open('output.html', 'w') as output:
    tsv_reader = csv.DictReader(shows_tsv, delimiter="\t")
    output.flush()
    for row in tsv_reader:
        details = [row['Show title'], row['Showrunner'], row['Confirmed Time'], row['Description'], row['Extra Hosts?']]
        if row['Confirmed?'] == "TRUE":
            print(*details)
            if details[-1] != '':
                details[-1] = "Extra Hosts: " + details[-1]
            output.write(ENTRY.format(*details))
