"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect, useContext } from "react";
import { Board, Spacer, Button, Slot, Referral } from "@/components";
import styles from "./style.module.scss";
import CopyToClipboard from "react-copy-to-clipboard";
import toast from "react-hot-toast";
import { useTelegram } from "@/providers/telegram";
import { referralUser, friendsUser, sendInviteUser } from "@/api";
import AppContext from "@/providers/context";
import TelegramIcon from "@public/icons/telegram-icon-alt.svg";
import LinkIcon from "@public/icons/link-icon.svg";
import { FriendProps, SpecialBonusProps } from "@/Types";
import { numberFormatter } from "@/helpers";

export const Friends = () => {
  const router = useRouter();
  const { user } = useTelegram();
  const { loading } = useContext(AppContext);
  const [modal, setModal] = useState(false);
  const [points, setPoints] = useState(0);
  const [invites, setInvites] = useState(0);
  const [friends, setFriends] = useState<FriendProps[]>([]);
  const [referrals, setReferrals] = useState<any[]>([]);
  const [specialBonuses, setSpecialBonuses] = useState<SpecialBonusProps[]>([]);
  const [referralLink, setReferralLink] = useState("");

  useEffect(() => {
    if (user) {
      referralUser(user.id).then((data) => {
        const { referralCode } = data;
        setReferralLink(referralCode);
      });

      friendsUser(user.id).then((data) => {
        const { referralPoints, friends, specialBonuses } = data;
        setFriends(friends);
        setPoints(referralPoints);
        setSpecialBonuses(specialBonuses);
      });
    }
  }, [user]);

  const handleSendInvite = () => {
    if (user) {
      sendInviteUser(user.id, { result: referralLink });
    }
  };

  if (loading) return null;

  return (
    <>
      <div className={styles.invite}>
        <Spacer space={20} />
        <h2 className={styles.invite__title}>Invite Friend</h2>
        <Spacer space={4} />
        <p>Invite friends to earn more Points</p>
        <Spacer space={24} />

        <div className={styles.invite__bonuses}>
          {specialBonuses.length > 0 &&
            specialBonuses.map((bonus, i) => (
              <Board
                key={bonus.questId}
                title={bonus.description}
                text={`${bonus.reward}`}
                reward
                done={bonus.done}
              />
            ))}
        </div>

        <Spacer space={12} />

        <Button
          size="large"
          variant="outlined"
          textColor={"var(--button-bg-primary)"}
          onClick={() => setModal(true)}
          radius={0}
        >
          <TelegramIcon />
          Create a story
        </Button>

        <Spacer space={28} />

        <div className={`${styles.invite__list} title-list`}>
          <div className="title-list-header">
            <h6>Top Referrals</h6>
          </div>
          <div className="title-list-body">
            {referrals.length === 0 && (
              <Slot text="You haven’t any referrals yet" />
            )}
            {referrals.length > 0 && (
              <div className={styles.invite__referrals_grid}>
                <div className={styles.invite__referrals_grid_column}>
                  <Referral
                    avatar="/images/profile-stub.jpg"
                    percent={10}
                    name="NemotoMakoto"
                    users={14}
                    earn={75000}
                  />
                </div>
                <div className={styles.invite__referrals_grid_column}>
                  <Referral
                    avatar="/images/profile-stub.jpg"
                    percent={10}
                    name="NemotoMakoto"
                    users={14}
                    earn={75000}
                  />
                </div>
                <div className={styles.invite__referrals_grid_column}>
                  <Referral
                    avatar="/images/profile-stub.jpg"
                    percent={10}
                    name="NemotoMakoto"
                    users={14}
                    earn={75000}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <Spacer space={28} />

        <div className={`${styles.invite__list} title-list`}>
          <div className="title-list-header">
            <h6>My friends: {friends.length}</h6>
          </div>
          <div className="title-list-body">
            {friends.length === 0 && (
              <Slot text="You haven’t invited any friends yet" />
            )}

            {friends.length > 0 && (
              <div className={styles.invite__friends_grid}>
                {friends.map((friend) => (
                  <div
                    key={friend.username}
                    className={styles.invite__friends_grid_column}
                  >
                    <Board
                      type="person"
                      avatar={
                        !friend.avatarLink.includes("null") ||
                        !friend.avatarLink === null
                          ? friend.avatarLink
                          : null
                      }
                      icon={
                        friend.avatarLink.includes("null") ||
                        friend.avatarLink === null
                          ? "/icons/spinner-color.svg"
                          : null
                      }
                      title={friend.username}
                      reward
                      text={numberFormatter(friend.points)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={styles.invite__actions}>
        <Button
          size="large"
          variant="filled"
          bgColor={"var(--button-bg-primary)"}
          textColor={"var(--button-text-primary)"}
          linkClick={() => handleSendInvite()}
          radius={0}
          href={`https://t.me/share/url?url=${referralLink}&text=Play Titans Game!`}
          // href={`#`}
          target="_blank"
        >
          <TelegramIcon />
          Invite a Friends
        </Button>
        <CopyToClipboard
          text={referralLink}
          onCopy={() => {
            toast.success("Link Copied", {
              id: "referal_copy",
            });
          }}
        >
          <Button
            size="large"
            variant="filled"
            bgColor={"var(--button-bg-disabled)"}
            textColor={"var(--button-bg-primary)"}
            onClick={() => {}}
            radius={0}
          >
            <LinkIcon />
          </Button>
        </CopyToClipboard>
      </div>
    </>
  );
};
