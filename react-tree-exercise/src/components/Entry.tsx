type Entry = {
   id: string
   name: string
   children?: Entry[]
}

type EntryProps = {
   entry: Entry
}

export default function Entry({ entry }: EntryProps) {
   return (
      <div className="entry">
         {entry.children ? (
            <details>
               <summary>{entry.name}</summary>
               {entry.children.map((child) => (
                  <Entry key={child.id} entry={child} />
               ))}
            </details>
         ) : (
            <div>{entry.name}</div>
         )}
      </div>
   )
}
