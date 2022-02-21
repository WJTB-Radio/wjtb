import csv
import sys

ENTRY = """<div class="show">
    <img src="../img/shows/default.png" alt="">
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

DAYS = 'MTWRF'

if len(sys.argv) > 1:
    with open(sys.argv[1], 'r') as shows_tsv, open('output.html', 'w') as output:
        tsv_reader = csv.DictReader(shows_tsv, delimiter="\t")
        output.flush()
        details = []
        for row in tsv_reader:
            if row['Confirmed Time']:
                details.append([row['Show title'], row['Showrunner'],
                                row['Confirmed Time'], row['Description'], row['Extra Hosts?'], row['Confirmed?']])
                # print(row['Confirmed Time'])
        days = [DAYS[DAYS.find(d[2][0])] for d in details]
        # print(days)
        details = [l for _, l in sorted(zip(days, details), key=lambda t: DAYS.index(t[0]))]
        for show in details:
            if show[-1] == "TRUE":
                # print(*show)
                # print(show[2])
                if show[-1] != '':
                    show[-1] = "Extra Hosts: " + show[-1]
                output.write(ENTRY.format(*show))
else:
    print("Usage: python3 showinfo.py checklist.tsv")
