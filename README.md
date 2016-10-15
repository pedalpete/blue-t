# blue-test

## Set-up

This app uses node v.4x and above.

For ease and speed in setting up the environment, it uses no external dependencies.

just run `npm install` to get the required node modules

The usual suspects to run and test

`npm start` and `npm test`

## Description and Approach

There isn't much to this app. I thought it was very simple, so I probably overcomplicated
things for myself with a self-imposed restrictions described in the "Thoughts" section.

### Articles
Articles are created from an `Article` class, which is in the src folder.

Article class requires a body and title and optionally tags and `Article.create()` then 
saves the Article in the article store.

Having the article as a class makes it easy to add actions which can be taken on articles, the class can
be extended to include edit, delete. In order to do this with a database back end, the article stores `get`
function would need to insantiate an article class, probably best done with some private methods for setting
date and id so those are not able to be set on new articles.

### Tags
Tags are kept in a store (see stores below).

Tags are added through the `add` method, which is called in `Articles.create()` so the tags are added
when a article is added.

Tags are lower-cased before being stored for consistency. So 'news' and 'News' and 'NEWS' are all the same
tag in the system. I'm sure there are many other tag issues which need to be dealt with like plurals,
hiphenated inconsistency, etc. These are not currently accounted for.

Getting related tags was a bit confusing. It's a simple task, but the example provided shows
```
{
  "tag" : "health",
  "count" : 17,
    "articles" :
      [
        "1",
        "7"
      ],
    "related_tags" :
      [
        "science",
        "fitness"
      ]
}
```

This leaves me unsure what the 'count' refers to. The document says `The count field shows the number of
 tags for the tag for that day.` I'm not sure what that means. Is that the total number before duplicates
 were removed? With only two articles and two related tags, how can the count be 17?
 I'm just returning the tag length as I wasn't sure what this was for, and how it was of value.

I've also left the possibility to get related tags without the date. I felt restricting by date was a 
bit limiting as a use case, though also beneficial if somebody wanted to filter by date or not.


### Stores
There is a store for articles and a store for tags. The stores currently hold items in a local object, so 
restarting the server means the data will all be lost. 

The stores were made with the intent of making it easy to drop-in a storage db of your choice without 
making any changes to the api.

### Helpers
Yeah, there's a little helpers file for functions which need to be used in both articles and tags.
This is currently only used to remove duplicate and lowercase tags, which happens to tags on articles and 
before the tags are saved to the tags store.

### Web-server
It had been a long time since I'd built a web-server in node, normally relying on 
express or the like. This is where a bit of time was probably not put to good use. But really, this 
is quite simple in node.

## Assumptions
The problem with assumptions is recognizing what you assumed.

* whoever is reviewing this code has node.js 4+ installed
* title and body had no length limits but both are required
* date and id would never need to be assigned directly but would be created when saved
* tags are case-insensitive
* date filter on getting related tags could be optional

## Thoughts

When I first read through the description, I thought. Well, that's fairly simple and straightforward.
I still believe it is. Maybe that means I didn't understand the requirement.

I approached the task hoping that I could learn something, which the task itself didn't provide.

### Modules
I decided not to use modules, as showing how I can glue together somebody elses code is not
interesting for either of us.

This meant a bit more time was spent creating the web-server, and I probably didn't end up with 
the most robust tag normalisation. I'm sure there is a module to help normalise tags, I didn't even 
look.

### es6
I decided to use es6 syntax because I haven't been exposed to it much and thought this was 
a good opportunity to learn.

Unfortunately for me, I'm on node 4, which I suspect is still the majority of users and node 4 support
for much of es6 is not available, which I didn't find out until I was already down the path. 

This caused a bit more work and slowed things down more than it should have as it would take a few minutes
to figure out that I can't assign value in the params, use spread operator, etc etc.

I could have used babel, that seems like a bit of overkill for this task. 

### Mocha/Chai
I used mocha and chai for testing where in the past I've used jasmine or tape. This wasn't a big
deal as they're all quite similar, but did mean I spent a bit of time in the documentation which slowed
me down futher.

### It took me too long
As mentioned above, everything I did to make the task interesting slowed me down. I had everything but the
web-server done in about 3 hours. The web-server with web-server testing took about 1.5 hours. Then there
was a bit of refactoring after that.

### Compared to other samples

I haven't done many of these sorts of things, the directions where quite clear, but I just didn't find
it that interesting, and I wonder, for the amount of work it was, even if it only took 1 hour, what 
is it really telling you about the people who complete it?

What was the tricky bit? The interesting thing?

Two of my favorite coding samples I've done are

* sorting music by popularity taking into account popularity decreases
the further into an album a song is.
* taking a text file in an unknown language and returning the
language and the probability of the answer being correct.

Those two samples were interesting as along with thinking about implementing the code, some thought had
to go into what you were doing. 

Your code sample request was pretty much, store some data, get it back, get some related stuff and remove duplicates. 
A bit mundane by comparison.