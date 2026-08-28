---
title: ProNounce
summary: A private, completely offline desktop product for exploring names, pronouns, everyday scenarios and voice.
eyebrow: Product case study · Identity exploration
date: 2026-08-15
accent: aqua
tags: Product strategy, Godot, Privacy, Accessibility
status: Public beta · v0.7.0-beta.1
externalUrl: https://terafora.itch.io/pronounce
icon: /icons/pronounce.png
featured: true
order: 1
draft: false
---
*An end-to-end product case study in turning a sensitive, personal need into a complete offline desktop tool.*

## At a glance

| | |
|---|---|
| **Product** | ProNounce, a private desktop app for experimenting with names, pronouns, everyday scenarios and voice |
| **My role** | Solo product designer and developer: discovery, product strategy, UX, content design, Godot/GDScript development, QA, privacy design, packaging and launch |
| **Audience** | Primarily trans, non-binary and questioning people, while remaining open to anyone who finds the tools useful |
| **Platform** | Windows desktop; distributed through itch.io |
| **Current release** | Public beta, version 0.7.0-beta.1 |
| **Development period** | July–August 2026; public beta released 15 August 2026 |
| **Core constraint** | Everything personal must remain local unless the user deliberately exports it |
| **Business model** | Pay what you want, with a suggested price of $12.99 and no features withheld from free users |

## Summary

ProNounce began with a fairly small question: where can somebody privately try a new name or set of pronouns before they are ready to use them with another person?

For many trans, non-binary and questioning people, identity exploration happens before there is a safe or comfortable social space in which to test it. A name can look right in a form but feel different when spoken in a café, a classroom or a work meeting. Voice tools exist, but many feel clinical, judgemental or fragmented across several phone apps. The result is a gap between abstract experimentation and the ordinary moments in which identity becomes real.

I designed and built ProNounce as a gentle bridge across that gap. It lets somebody create separate local profiles, try names and pronouns in realistic conversations, make their own scenarios, record and replay their voice, view simple descriptive pitch information, and reflect on how the experience felt. It works completely offline, does not require an account and does not collect behavioural or personal data.

The first public beta was released on itch.io on 15 August 2026. In its first 12 days it received 24 page views and 5 downloads without paid promotion or a coordinated marketing campaign. That sample is far too small to prove product–market fit, but its 20.8% observed download-to-view ratio provides an encouraging early signal: when somebody reaches the page, the proposition appears capable of making sense to them. This is an aggregate ratio rather than a tracked user-level conversion funnel. The present challenge is discovery, not evidence of mass demand—and that is appropriate for a deliberately small, specific product.

## The problem was not pronoun storage. It was psychological safety.

It would have been easy to describe the problem as a need for a form that stores a name and pronouns. That would have produced a technically valid but emotionally incomplete product.

The deeper need was rehearsal without exposure.

Trying an identity in front of another person can feel like stepping onto a stage before you know whether the words fit. Even a supportive friend changes the stakes because the experiment has now been witnessed. ProNounce needed to offer the equivalent of an empty theatre: somewhere the user could hear the lines, change them and try again without an audience waiting for a conclusion.

That led to several connected user needs:

- **Private experimentation:** try a name, pronouns or voice without creating an account or explaining the experiment to anyone.
- **Context rather than labels:** experience those choices inside ordinary conversations rather than as isolated words.
- **Reversibility:** create several profiles and move between possibilities without treating any one choice as final.
- **Agency rather than assessment:** receive information that supports interpretation without being told what is correct, convincing or sufficiently gendered.
- **Continuity:** save scenarios, reflections and preferences locally so exploration can unfold over time.
- **Ownership:** export or back up data deliberately, while otherwise keeping it on the user’s own computer.

## Discovery: beginning with lived friction, then testing the shape of the product

ProNounce was founder-led, problem-informed discovery rather than a large formal research programme. That distinction matters. I was working from a combination of lived understanding, observation of the tools already available and repeated examination of where the experience felt too clinical, too public or too fragmented. I did not want to overstate a small evidence base as universal user research.

The original concept was deliberately narrow: let somebody enter a name and pronouns and see them used privately. As I worked through the actual job the user was trying to accomplish, it became clear that substitution alone would not be enough.

A new name is rarely experienced as a database value. It is experienced when somebody calls it across a room, adds it to a booking, introduces a colleague or corrects a mistake. This moved the product towards scenario-based practice. The same reasoning then exposed the limits of a fixed content library: no set of built-in scenes could anticipate every family, cultural, educational or workplace context. Custom scenario creation, import and export therefore became part of the core product rather than an optional extra.

Voice followed the same pattern. Names and pronouns answered part of the need, but users might also want to hear themselves saying the words, compare the feeling of different deliveries or simply become more comfortable speaking. The product expanded into recording and reflection, while retaining a clear boundary between supportive information and clinical voice analysis.

The result was not scope growth for its own sake. Each addition closed a gap in the same journey:

1. **Define a possibility** through a local profile.
2. **Experience it in context** through everyday scenarios.
3. **Adapt the context** through custom scenes.
4. **Practise speaking** through recording and playback.
5. **Notice rather than score** through descriptive information and reflection.
6. **Return safely** through local history, preferences and backups.

## Product principles

Five principles became the filter for feature and technical decisions.

### 1. Privacy had to be structural

Privacy could not be a reassurance added to the settings screen. ProNounce therefore has no account system, cloud sync, advertising, in-app analytics, telemetry, crash uploads or online voice analysis. It has no network-dependent features. Profiles, custom scenarios, reflections and preferences remain in the application’s local data directory.

Microphone access begins only when the user chooses to record. A practice take is kept temporarily for the current session and discarded unless the user explicitly saves it as a WAV file. Backups and exports are user-initiated rather than automatic.

This choice deliberately limits the product data available to me. I can see itch.io page and download statistics, but I cannot silently inspect feature usage, recordings or retention. For a product handling identity and voice, I consider that a worthwhile trade: trust is part of the functionality.

### 2. Exploration should not imply commitment

The user can create multiple profiles rather than overwrite one supposedly definitive identity. This supports comparison, gradual change and uncertainty. ProNounce does not assume that experimentation must end in a single answer.

Profiles support custom names, pronouns and grammatical agreement. Treating agreement as configurable avoids assuming that every pronoun set follows one fixed English pattern. It also turns the feature from a cosmetic text replacement into a more robust content system.

### 3. The product should describe, not judge

Voice tools can easily reproduce the pressure they are meant to relieve. A score, pass/fail result or gender verdict would position the software as an authority over the user.

ProNounce instead offers recording, playback, waveform display and simple descriptive pitch information for personal exploration. It is explicitly not medical or diagnostic software. The reflection step uses emotional language—such as comfortable, curious, unsure, uncomfortable or excited—rather than a success score.

The question is not “Did the user sound correct?” It is “What did the user notice, and how did it feel?”

### 4. Flexibility should outlive my assumptions

The public beta includes 24 built-in scenarios covering ordinary situations such as introductions, collecting an order, joining a meeting, speaking with a tutor, correcting a name or pronoun and taking part in group chats or projects.

However, identity is shaped by context, and my content library could never represent every user’s life. Custom scenarios therefore include local creation, editing, reordering, deletion, JSON import and export. Imported duplicates can be reviewed and either skipped or copied, while validation prevents malformed or empty scenes from entering the library.

This is an important product lesson: sometimes the most inclusive feature is not an impossibly large catalogue. It is a safe way for users and communities to author what the original designer could not foresee.

### 5. Access should not depend on disposable income

ProNounce is distributed as a complete pay-what-you-want product. The suggested price is $12.99, but somebody for whom payment would be a barrier can download the same application for free. There is no restricted free edition and no subscription.

That model reflects the purpose of the tool. A product intended to give somebody a private place to explore who they may be should not make its most useful or reassuring features conditional on their ability to pay.

## Designing the experience

The navigation follows a deliberately gentle sequence:

**Welcome → Profile Hub → Scenario selection → Practice scene → Reflection**

The profile hub makes experimentation visible as a set of possibilities rather than hiding it inside settings. Scenario cards translate a broad library into recognisable moments. The practice scene uses a visual-novel-like conversational structure so that a name or pronoun appears as part of human interaction rather than a grammar exercise. The reflection screen slows the journey down before returning the user to the library.

That rhythm matters. It turns the application from a generator into a small rehearsal space. The user chooses the setting, encounters the language, optionally speaks, then has a moment to notice their reaction.

I also designed for different comfort and access needs. The beta supports keyboard navigation, adjustable text size and reduced-motion settings. Recording is optional, as is the built-in jukebox. The soundtrack contains 11 curated, human-composed tracks by しゃろう, helping the app feel less like a clinical utility while allowing users to turn it off when they need quiet or use assistive audio.

The content itself went through a similar human-centred pass. Scenario dialogue was revised to sound like plausible everyday speech rather than a set of demonstrations written to expose placeholders. That work was less visible than implementing a new feature, but it was central to whether the product felt reassuring or artificial.

## Technical implementation

I built ProNounce in Godot using GDScript and exported the public beta as a Windows desktop application. The release is distributed as a 92 MB ZIP containing the executable and Godot package.

The implementation mirrors the product model:

- A local profile store persists names, pronouns, agreement choices and related preferences.
- A scenario catalogue separates built-in scenario sets from a custom scenario store.
- Scenario data is represented structurally rather than hard-coded into individual screens, allowing the UI to load sets and populate cards dynamically.
- The custom editor validates required fields and dialogue steps, generates safe local identifiers and supports reordering, deletion and portable JSON files.
- Reflection history, soundtrack settings, microphone preferences and accessibility choices are stored locally.
- Recording, playback, waveform display and pitch information are processed on the device.
- Backup and restore provide user-controlled portability without introducing an account or hosted database.

This architecture kept the product maintainable as the scope grew. Profiles, built-in content and user-created content share an experience without becoming one monolithic screen or a collection of one-off flows. It also leaves room for additional scenario packs and richer local voice tools without replacing the privacy model.

The local-first approach removed the need for backend hosting, authentication, remote storage and ongoing server costs. More importantly, it aligned the implementation with the emotional promise of the product. The architecture and the copy tell the same story: the user’s identity and recordings belong to them.

## Iteration, prioritisation and release decisions

ProNounce moved through repeated functional slices rather than being designed as one complete specification and built all at once.

The early application established profile creation, persistence and a profile hub. Dynamic placeholders and grammatical agreement made the stored data meaningful inside text. Scenario selection and conversation flows then turned those substitutions into practice. Custom scenarios, import/export and reflections extended the experience beyond the initial catalogue. Recording, playback, pitch information and free voice practice connected identity exploration with spoken experience. Finally, backup/restore, accessibility options, music, privacy documentation and packaging turned the feature set into a distributable product.

This progression gave me several opportunities to stop and reconsider scope. The largest was voice analysis. It would have been possible to delay release until the application contained richer information about resonance, brightness, darkness and change over time. That path risked turning a useful beta into a permanently unfinished voice laboratory.

I chose to release with clear, simple pitch information and treat more sophisticated analysis as a post-beta area. The existing tools already supported the core job, while real use was more likely than private speculation to reveal what should come next.

I made a similar decision about updates. A full in-app self-updater would have added substantial release and security complexity to the first version. The safer beta strategy was to distribute updates through itch.io, preserve local user data between builds and consider only a lightweight notification that points users to the project page.

Release preparation included testing the exported Windows build rather than assuming that behaviour inside the Godot editor would be identical. Packaging exposed issues around bundled audio and forced the same kind of end-to-end verification a user would experience: unzip the release, launch the executable, confirm persisted data, exercise the main journeys and check that third-party assets and notices were actually present.

## Launching as a public beta

The public beta was published on itch.io at 07:43 UTC on 15 August 2026, followed by a launch devlog four minutes later. It was released as a Windows tool in development rather than presented as a finished, clinically validated product.

The page communicates the proposition before the feature list: private identity exploration, completely offline, complete at any price and designed primarily with trans, non-binary and questioning people in mind. It also states what ProNounce is not. There is no account, advertising, analytics, generative AI or data collection, and the voice tools do not diagnose or judge the user.

This was a soft launch. There was no paid advertising, press campaign, influencer placement or coordinated community push. Initial communication consisted of an itch.io devlog, one Bluesky announcement, sharing with friends and contacting the moderators of r/trans to ask about appropriate promotion. Describing the launch as “zero marketing” is directionally fair in the sense that there was no campaign or budget, but “minimal founder-led communication and otherwise organic discovery” is the more precise professional description.

That precision matters because it makes the early results more useful. They do not measure the effectiveness of a marketing plan. They show what happened when a very small, niche product was made publicly available with almost no distribution engine behind it.

## Early traction: what the first 12 days do and do not tell us

The following figures are from the itch.io Creator Dashboard on 27 August 2026.

| Metric | First 12 days | Interpretation |
|---|---:|---|
| Page views | 24 | Very low reach, consistent with a soft launch and niche audience |
| Downloads | 5 | A real but very small number of acquisition events |
| Observed download-to-view ratio | 20.8% | Encouraging proposition-level signal, but not a tracked user-level conversion rate and based on too few people for a stable benchmark |
| Payments / revenue | 0 | Expected at this scale for a pay-what-you-want accessibility model |
| Ratings | 0 | No public satisfaction signal yet |
| Collections | 0 | No platform bookmarking signal yet |

Downloads were recorded on three separate dates: two at launch, one several days later and another two on 23 August. Page views also continued on most days after the first launch spike. This is more encouraging than five downloads from one burst of friendly traffic because it suggests that the page continued to be found after launch day.

The referral table attributes 16 visits to the broader Terrafora itch.io profile, one to Reddit and one to Bluesky. The remaining views are not identified in the displayed referral summary and may represent direct, internal itch.io or other unlisted traffic. Most visible discovery is therefore happening inside the small ecosystem already surrounding the creator page rather than through social reach.

At the time of this snapshot, the public page was also returning a `noindex` instruction to search engines, while its two devlog posts were restricted to logged-in users pending itch.io moderator review. The product had therefore not received normal search-engine or public-devlog exposure. This makes the traffic an even narrower test of discovery, but it also means the first 12 days should not be treated as a settled organic baseline.

There are three important limitations:

1. **A download is not the same as an active user.** The app contains no telemetry, so I cannot claim that five people completed scenarios or returned later.
2. **Twenty-four views are not a reliable acquisition sample.** One additional download would move the aggregate ratio from 20.8% to 25%; one fewer would reduce it to 16.7%.
3. **There is no qualitative evidence yet.** With no ratings, comments or structured beta feedback, the numbers cannot explain what users valued or where they struggled.

The responsible conclusion is therefore modest: ProNounce has demonstrated that people can discover and download it, and its page has not shown an obvious page-to-download interest problem. It has not yet demonstrated retention, outcomes or repeat recommendation.

## Where ProNounce is likely to go

ProNounce serves an incredibly specific intersection: people who are exploring identity, want scenario-based and voice practice, prefer a desktop application, value complete offline privacy and happen to find an independent itch.io tool. It should not be forecast as though it were a general consumer productivity app.

A straight-line annualisation of five downloads in 12 days would produce roughly 150 downloads in a year. That is useful as a scale reference, not a forecast: launch traffic normally decays, while updates or recommendations can create new bursts.

The more honest outlook is a set of scenarios:

| Scenario | Plausible trajectory | What would drive it |
|---|---|---|
| **Quiet organic tail** | Roughly 50–100 downloads in the first year | Existing itch.io discovery continues but launch attention fades |
| **Steady niche resource** | Roughly 100–250 downloads in the first year | Periodic updates, clearer page discovery and occasional word of mouth |
| **Community-supported growth** | Roughly 300–750 downloads over a year | Inclusion in resource lists, community recommendations or coverage by relevant creators |
| **Recognised long-tail tool** | 1,000–2,000+ downloads over several years | The product earns trust, remains maintained and is repeatedly recommended beyond itch.io |

These are scenario bands, not promises derived from a 12-day sample. Search indexing and the eventual outcome of itch.io’s moderation review could materially change the available discovery surface. Even so, the most defensible near-term expectation is tens to low hundreds of downloads, with a durable few-hundred-person user base a meaningful success. Reaching several thousand is possible for a respected niche resource, but it would require a step-change in distribution rather than continuation of the current traffic alone.

That does not make the project less valuable. For a sensitive tool, usefulness is not proportional to mass reach. If ProNounce becomes the private place that a few hundred people use while working out how they want to be addressed or heard, it has solved a real problem. Commercially, the current model is more likely to support a portfolio and a wider body of thoughtful products than to become a large standalone revenue stream without significantly broader distribution.

## What the project demonstrates

ProNounce is useful to me as a case study because the work was not confined to implementation. I owned the complete product lifecycle:

- identifying and reframing the underlying problem;
- turning a sensitive need into product principles and acceptance boundaries;
- defining the audience without treating it as homogeneous;
- mapping a coherent journey from profile to context, practice and reflection;
- prioritising an MVP while allowing the concept to expand where the user journey required it;
- designing flexible content and grammatical systems;
- writing and revising 24 naturalistic scenarios;
- implementing the product in Godot/GDScript;
- designing local persistence, import/export, backup and privacy behaviour;
- integrating microphone recording, playback and descriptive feedback;
- incorporating accessibility, keyboard and reduced-motion options;
- managing third-party music, fonts, notices and no-generative-AI positioning;
- testing the packaged build and preparing release documentation;
- setting pricing and access principles;
- publishing the beta, writing its product page and devlogs; and
- analysing early performance without overstating what the data can prove.

It demonstrates the kind of product work I care about: starting with the human experience, using technical decisions to protect it and still bringing the idea all the way to a real release.

## What I would do next

The next stage should be led by evidence rather than by the size of a feature backlog.

### 1. Gather qualitative beta evidence

Because privacy rules out passive in-app analytics, feedback needs to be deliberate and external. The most useful questions are whether users understand the profile/scenario journey, whether any language feels uncomfortable, which scenarios they return to, and what information they actually want from the voice tools.

### 2. Improve onboarding and accessibility

The public beta already supports adjustable text and reduced motion, but a first-run explanation could make the relationship between profiles, scenarios, recording and reflections clearer. Accessibility review should include keyboard-only use, focus visibility, contrast, text scaling and microphone-denied states.

### 3. Deepen voice information without changing its ethics

Potential additions include clearer comparisons between recordings, change over time and descriptive qualities such as brightness or darkness. These should remain local, non-generative and non-prescriptive. The user should receive a mirror, not a verdict.

### 4. Extend scenarios through depth and community portability

More built-in scenarios would help discovery, but deeper customisation and reliable import/export may create more lasting value. Portable scenario files could allow communities to share useful contexts without requiring a central account or content service.

### 5. Treat distribution as a product problem

The initial conversion signal suggests that rewriting the proposition is not the first priority. The more immediate question is how the right people encounter it. Relevant resource lists, thoughtful community participation, devlogs, demonstrations and trusted creator coverage would be more suitable than broad paid advertising for a product whose adoption depends heavily on trust.

## Reflections

The most important lesson from ProNounce is that privacy, tone and distribution are not layers placed around the “real” product. They are part of the product.

An online account would have made synchronisation and analytics easier, but it would also have changed what it felt like to experiment. A more prescriptive voice score might have looked sophisticated, but it would have contradicted the user’s authority over their own identity. A fixed scenario library would have been easier to build, but it would have made my imagination the boundary of somebody else’s life. A conventional fixed price might have produced more revenue per sale, but it would have excluded some of the people the application exists to support.

Good product work is often less like adding pieces to a machine and more like tuning an instrument: every new capability changes the feel of the whole. ProNounce became coherent because the same question was applied to its UX, architecture, content and business model: does this give the user more room to explore on their own terms?

The first beta is small, and its audience may always be small. I am comfortable with that. The aim was not to manufacture a universal platform from a sensitive need. It was to notice a gap, treat it seriously and build something complete enough that another person could use it.

That is what I shipped.

## Evidence and links

- [ProNounce on itch.io](https://terafora.itch.io/pronounce)
- [ProNounce repository](https://github.com/Terafora/ProNounce)
- itch.io Creator Dashboard snapshot, 27 August 2026: 24 views, 5 downloads, 0 payments, 0 ratings and 0 collections
- Public beta release: 15 August 2026, version 0.7.0-beta.1

*Metrics and projections in this case study are a snapshot, not a claim of retained users or product–market fit. Forecast ranges are scenario planning based on the first 12 days of distribution and should be updated as the evidence base grows.*
