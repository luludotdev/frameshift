# 📡 Streaming to a Frameshift Instance
## ✅ Requirements
* [OBS Studio](https://obsproject.com/) Version 27 or later
* A correctly set up Frameshift Instance
* HTTP Client *(optional)*

## 🔑 Stream Keys
Stream keys for Frameshift are in the format `channelid-secret` where `channelid` is the Channel ID you wish to stream to, and `secret` is an HMAC derived secret key. You can acquire these keys either by calculating the secret manually, or by using the Frameshift API to calculate it for you.

### Calculating
The `secret` portion of the stream key is derived from the channel ID using an HMAC algorithm. The HMAC secret is specified via the `FTL_CLIENT_HMAC_SECRET` environment variable, refer to your configuration to find this value. The specific HMAC algorithm used is specified by the `FTL_CLIENT_HMAC_ALGO` environment variable, and defaults to SHA-1 if unset.

To calculate the `secret`, simply calculate the HMAC value of the channel ID (as UTF8 text) using the values mentioned above, and output as lowercase hex values. Combine that string with your channel ID in the format mentioned at the start of this section to assemble a complete stream key.

### Fetching via API
If you want to avoid calculating keys manually, you can send an HTTP GET request to `/api/ingest/hmac/:channelID`, where `:channelID` is the channel ID you wish to get the stream key for. To prevent anyone from generating stream keys, this route is protected. You will need to specify the `Authorization` header with the value of the `FTL_SERVICE_REST_AUTH_TOKEN` environment variable.

A successful response will be a JSON object with a single `hmacKey` property. This is the `secret` portion of the stream key. Combine that string with your channel ID in the format mentioned at the start of this section to assemble a complete stream key.

```sh
# Example using cURL
$ curl -H 'Authorization: <auth_token>' <api_base>/api/ingest/hmac/<channel_id>
```

## ⚙️ OBS Setup
In OBS, create a new profile from the `Profile` dropdown, you may name it whatever you like. The rest of the configuration will be done in the OBS settings menu. Click the `File` dropdown and then click on `Settings`.

### Streaming Server
In the `Stream` tab, change the `Service` to `Custom...`

The value of `Server` will be `ftl://<your_hostname>`. If your FTL instance is accessible at `ftl.example.com`, you should use `ftl://ftl.example.com`. See above for generating a stream key.

### Encoder Settings
In the `Output` tab, change the output mode to Advanced. You can either use `NVIDIA NVENC H.264 (new)` for hardware encoding or `x264` for software encoding. Refer to the relevant sections below for configuring OBS correctly for either of these encodings.

#### Which encoder should I use?
Both encoders vary in terms of system usage, quality, and latency. Hardware encoding uses the GPU, and generally uses less system resources, but if you are streaming something GPU heavy and have CPU to spare, consider using software encoding.

Software encoding uses the CPU and should only be used if you have CPU power to spare. The x264 implementation has a maximum limit of 8 threads that it can use at any one time, so CPUs with lots of threads can benefit from CPU encoding.

For the same bitrate, software encoding will look better in terms of video quality, but this comes at a cost of latency. Hardware encoding latency from screen-to-screen on a good connection can be as low as 150ms, whereas software encoding is generally above 1000ms.

#### NVIDIA NVENC H.264 (new)
| Property | Value | Notes |
| - | - | - |
| Rate Control | CBR | |
| Bitrate | 6000 (Recommended) | You should check your [upload speed](https://speed.cloudflare.com/) to see what you can handle. Note that higher bitrates require more bandwidth for the server to process, and more for viewers to keep your stream stable. |
| Keyframe Interval | 2 | Setting to anything other than `2` will result in instability. |
| Preset | Max Quality | Turn this down to `Quality` if the encoder can't keep up. |
| Profile | high | Turn this down to `main` if the encoder can't keep up. |
| Look-ahead | Off | Setting to anything other than `off` will result in instability. |
| Psycho Visual Tuning | Off | Setting to anything other than `off` will result in instability. |
| Max B-frames | 0 | Setting to anything other than `0` will result in instability. |

#### x264
| Property | Value | Notes |
| - | - | - |
| Rate Control | CBR | |
| Bitrate | Same as NVIDIA NVENC | |
| Keyframe Interval | Same as NVIDIA NVENC | |
| CPU Usage Preset | medium (Recommended) | Set this as slow as your system can handle for the best quality. Generally `medium` is a good balance of leaving CPU available for other applications and quality, but feel free to experiment. |
| Profile | Same as NVIDIA NVENC | |
| Tune | none | Leaving as `none` will be good for most scenarios, but you may want to consider changing this and see if there is any performance benefits. See [this post](https://superuser.com/a/564404) for an explation of values. |

## ❤️ Supporting my Work
If Frameshift has helped you in any way, please consider supporting my work. At the top of the GitHub repo is a `Sponsor` button where you can find links to donate to me directly. Any donations are greatly appreciated and help me continue to work on projects like this and release them for free.
