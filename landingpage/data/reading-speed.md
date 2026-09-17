# Why a read can be slow

Most reads from the hub are fast. Occasionally the first one is not, and it
looks exactly like something being broken: a call to `open_zarr` or a
`.load()` that sits there for minutes with no output and no error.

It is almost always a tape recall, and it is working as intended.

## What is happening

Data on the hub is tiered. A dataset nobody has touched for a long time is
moved to tape, and the first read afterwards has to bring it back. Nothing is
deleted and nothing needs restoring by hand, but the recall takes time.

- The **first** read of an archived dataset takes minutes rather than seconds.
- Everything after it runs at normal speed, until the data goes cold again.
- Metadata is never affected. Opening a dataset, listing its variables and
  reading its attributes work whether or not the data itself is on disk, so a
  store stays browsable at all times.

That last point is the useful diagnostic. If `xr.open_zarr` returned quickly
and printed the dataset, but the first `.load()` or `.plot()` hangs, you are
waiting on a recall rather than on a network or credentials problem.

## What to do about it

**Wait.** A recall that has started will finish. Killing the process and
retrying does not speed it up, and a retry loop makes things worse by queueing
more recalls for the same data.

**Do not treat it as a timeout to tune around.** Raising a client timeout is
fine; retrying on one is not.

**Warm the data before a large job.** If you are about to run something long
over a dataset that has been sitting untouched, read a small slice of it first
and let the recall happen while you are doing something else.

**Ask us to pin it.** If you are working with a dataset intensively over days
or weeks and would rather it stayed on disk throughout, say so. Pinning is a
deliberate decision with a name and a reason attached, which is better than
scripting around the recall.

[Contact support](mailto:waterpark@support.dkrz.de){ .md-button }

## Reading less in the first place

A recall you never trigger costs nothing, and the usual reason for touching
far more data than a question needs is reaching for the finest pyramid level
and the highest frequency out of habit.

Matching both to the question is the single biggest lever anyone has over how
long an analysis takes, and the [examples](gallery/index.md) work through it
with real numbers. A zonal mean does not need level 9, and a figure with five
hundred pixels along its time axis does not need hourly data.

If you want to know how the tiering decision itself is made, see
[how data is tiered](storage_concepts/tiering.md).
