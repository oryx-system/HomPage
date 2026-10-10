# HomPage production preparation — blocked on approved file bytes

This is a preparation branch, not the published production result. The user authorized HomPage main publication through its existing GitHub Pages workflow. No further deployment permission is needed. Publication is blocked by missing approved binary files, not an approval rejection.

## Preserved baseline and destination

- HomPage main was freshly fetched and remains `5b3c59d2a037ea7d482af9231b1084bd371a43e6`.
- The complete source is preserved locally on `codex/datasafe-production-renewal`, commit `7e466ce`, based directly on that main commit. The remote branch initially contains main plus this handoff note, and is available for approved-file relay; the complete prepared source has not been pushed there.
- Prior private Sites v3 source commit `2ac18bc198e3b0810d8c2d1fec523b8698ee90b3`, deployment and archive remain preserved. No new Sites publish was performed.
- Existing `.github/workflows/deploy.yml` and `public/CNAME` are unchanged. Main was not pushed, and the live domain was not changed.
- OryxSystem_Web was not edited.

## Source prepared

- Direct email inquiry without an input form or false submission status.
- Transparent original Oryx System footer logo.
- KO/EN/RU content, one globe language menu, metadata language updates and reading-position preservation.
- Calibration workflow, controlled publication, separate performer submission and approval, Audit Trail, online server OCR and retained offline photographs/manual values.
- All company founding timeline removed; the representative's 20 years of field experience retained.
- Lightweight, eager static WebP covers for the four existing PDFs, warmed for both PDF languages; PDFs remain click-only.
- Superseded demo/AI pages and the unused prior multi-page source removed.
- Navy monitor layout and 4.4-second clipped light layer prepared. Actual monitor, shield/text clip coordinates and visual blend remain unverified until approved pixels arrive. The entire monitor is not animated; reduced-motion disables the light layer.

## Current verification

- Clean dependency install in the production worktree: PASS (`npm ci` with a writable temporary cache).
- TypeScript: PASS.
- Static regression tests: 2/2 PASS, including sentinel-based prevention of private API environment substitution.
- Existing content browser checks at 360/390/768/1024/1440: 44 PASS, 1 intentional desktop mobile-menu skip. Translation reading-position comparisons use a real pointer click on the sticky header and put the intended heading/paragraph on the reading line. Initial automation-induced scrolling failures are preserved and explained separately.
- Independent KO/EN/RU × 360/390/768/1199/1200/1440 renders: 18 PASS for Korean leftovers, overflow, structure and 1200px navigation transition.
- Accessibility label-in-name issues found during review were fixed; final follow-up evidence is in `review/pending-assets-qa/`.
- Final production build: BLOCKED by `prebuild` detecting all five missing approved assets. An earlier Vite-only build passed with a missing-image warning; it is not a valid final production build.
- Six-PDF download and popup checks, initial-PDF-request checks, a complete no-error render and the monitor effect checks remain pending against a complete stable build.

## File relay needed

Fresh Library preparation succeeded for all five approved files. The unchanged supported transfer helper attempted each file, but the environment egress proxy refused HTTPS CONNECT with HTTP403. Additional-network and an approved escalated attempt also failed. There was no automatic approval rejection, and no access or security setting was changed. No signed URL or token is stored in this repository.

The actual file bytes can be relayed through this existing HomPage branch or an accessible workspace path. Required exact paths, byte counts and expected final PDF SHA256 values are in `review/production-required-assets.json`. The two approved PDFs contain seven pages each and the final email/homepage. Their metadata has been received; their actual bytes have not been downloaded or hash-verified here.

After the five files arrive:

1. Fetch the relay commit and verify the final original bytes and PDF hashes.
2. Inspect the monitor image; set the clip strictly around its single baked shield and DATA SECURITY label, then verify its blended edges, 3–5-second pulse and reduced motion.
3. Produce lightweight static first-page covers; add the two actual Calibration cards to `data/brochures.ts`, generalize the brochure guidance/Calibration CTA and keep RU PDF unavailability explicit.
4. Run the complete stable-build browser/PDF suite, types, static tests and production build; preserve final screenshots and corrected evidence separately from pending-file QA.
5. Re-fetch main, preserve any intervening changes, fast-forward the authorized verified source to main without force, then verify GitHub Actions, existing Pages publication and the actual domain. Do not change hosting or security settings.
