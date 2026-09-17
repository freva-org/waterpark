# How data is tiered

A Waterpark store is millions of objects. That is too many to make a tiering
decision about individually, and too few distinct datasets to treat each store
as one unit: recalling an entire pyramid because somebody asked for one month
at level 4 would waste most of the transfer.

Blobs are what sits in between. Objects that are likely to be wanted together
are grouped, and the group is what moves to tape and comes back from it. The
grouping is the whole of the tiering policy, so it is written down rather than
implied by the file layout.

<div class="grid cards" markdown>

-   :material-database-arrow-down:{ .lg .middle } __blobmap__

    ---

    Decides which Zarr objects move to tape together, and reads that decision
    back. The manifest it writes is what turns a store full of individual
    objects into a set of units that a tiering system can reason about.

    [:octicons-book-16: Documentation](/tech/blobmap/){ .md-button }
    [:octicons-file-code-16: Manifest format](/tech/blobmap/latest/schema)

</div>

## What this looks like from outside

Metadata is never tiered, so a store stays browsable whatever state its data
is in. Only the first read of a cold dataset is slow, and only until the
recall finishes.

The reader-facing version of this, including what to do when a read hangs,
is on [why a read can be slow](../reading-speed.md).
