import { TNSRTCTrackEventBase } from '../base/TNSRTCTrackEventBase';
import { TNSRTCMediaStreamTrack } from './TNSRTCMediaStreamTrack';
import { TNSRTCRtpTransceiver } from './TNSRTCRtpTransceiver';
import { TNSRTCRtpReceiver } from './TNSRTCRtpReceiver';
import { TNSRTCMediaStream } from './TNSRTCMediaStream';

export class TNSRTCTrackEvent extends TNSRTCTrackEventBase {
    private _event;
    private _mediaTrack: TNSRTCMediaStreamTrack;
    private _transceiver: TNSRTCRtpTransceiver;
    private _receiver: TNSRTCRtpReceiver;
    private _streams: Array<TNSRTCMediaStream>;

    constructor(event) {
        super(event);
        this._event = event;
        this._mediaTrack = TNSRTCMediaStreamTrack.fromNative(this._event.getMediaTrack());
        this._transceiver = this._event.getTransceiver() ? TNSRTCRtpTransceiver.fromNative(this._event.getTransceiver()) : null;
        this._receiver = this._event.getReceiver() ? TNSRTCRtpReceiver.fromNative(this._event.getReceiver()) : null;
        const array = [];
        const nativeArray = this._event.getStreams();
        if (nativeArray) {
            const size = nativeArray.size();
            for (let i = 0; i < size; i++) {
                const stream = nativeArray.get(i);
                array.push(TNSRTCMediaStream.fromNative(stream));
            }
        }
        this._streams = array;
    }

    public get track(): TNSRTCMediaStreamTrack {
        return this.mediaTrack;
    }

    public get mediaTrack(): TNSRTCMediaStreamTrack {
        return this._mediaTrack;
    }

    public get transceiver(): TNSRTCRtpTransceiver {
        return this._transceiver;
    }

    public get receiver(): TNSRTCRtpReceiver {
        return this._receiver;
    }

    public get streams(): Array<TNSRTCMediaStream> {
        return this._streams;
    }

    public static fromNative(event) {
        return new TNSRTCTrackEvent(event);
    }
}
