"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect, useContext } from "react";
import { Board, Spacer, Button, Slot, Referral } from "@/components";
import styles from "./style.module.scss";
import CopyToClipboard from "react-copy-to-clipboard";
import toast from "react-hot-toast";
import { useTelegram } from "@/providers/telegram";
import { userAxios } from "@/api";
import AppContext from "@/providers/context";
import TelegramIcon from "@public/icons/telegram-icon-alt.svg";
import LinkIcon from "@public/icons/link-icon.svg";

export const Friends = () => {
  const router = useRouter();
  const { user } = useTelegram();
  const { loading, setLoading } = useContext(AppContext);
  const [modal, setModal] = useState(false);
  const [points, setPoints] = useState(0);
  const [invites, setInvites] = useState(0);
  const [friends, setFriends] = useState<any[]>([]);
  const [referralLink, setReferralLink] = useState("referral link");

  useEffect(() => {
    if (user) {
      const token = sessionStorage.getItem("token");
      userAxios
        .get(`/users/${user?.id}/friends`)
        .then((res) => {
          const {
            data: { referralPoints, invitesCounter, friends },
          } = res;
          setFriends(friends);
          setPoints(referralPoints);
          setInvites(invitesCounter);

          userAxios.get(`/users/${user?.id}/referral`).then((res) => {
            const {
              data: { referralCode },
            } = res;
            setReferralLink(referralCode);
          });
        })
        .catch((error) => {
          router.replace("/");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [user]);

  // if (loading) return null;

  return (
    <>
      <div className={styles.friends}>
        <Spacer space={20} />
        <h2 className={styles.friends__title}>Invite Friend</h2>
        <Spacer space={4} />
        <p>Invite friends to earn more Points</p>
        <Spacer space={24} />

        <div className={styles.friends__bonuses}>
          <Board reward title="Special bonuses #1" text="+1 000 " />
          <Board reward title="Special bonuses #2" text="+1 000 " />
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

        <div className={`${styles.friends__list} title-list`}>
          <div className="title-list-header">
            <h6>My friends: 0</h6>
          </div>
          <div className="title-list-body">
            <Slot text="You haven’t invited any friends yet" />

            <div className={styles.friends__list_grid}>
              <div className={styles.friends__list_grid_column}>
                <Referral
                  avatar="/images/profile-stub.jpg"
                  percent={10}
                  name="NemotoMakoto"
                  users={14}
                  earn={75000}
                />
              </div>
              <div className={styles.friends__list_grid_column}>
                <Referral
                  avatar="/images/profile-stub.jpg"
                  percent={10}
                  name="NemotoMakoto"
                  users={14}
                  earn={75000}
                />
              </div>
              <div className={styles.friends__list_grid_column}>
                <Referral
                  avatar="/images/profile-stub.jpg"
                  percent={10}
                  name="NemotoMakoto"
                  users={14}
                  earn={75000}
                />
              </div>
            </div>
          </div>
          {/* {friends.length > 0 &&
            friends.map((friend) => {
              const { telegramId, avatarLink, username, jupbotPoints, level } =
                friend;
              return (
                <Board
                  key={telegramId}
                  avatar={avatarLink}
                  title={username}
                  value={`${jupbotPoints} JPP`}
                />
              );
            })} */}
        </div>
      </div>
      <div className={styles.friends__actions}>
        <Button
          size="large"
          variant="filled"
          bgColor={"var(--button-bg-primary)"}
          textColor={"var(--button-text-primary)"}
          onClick={() => {}}
          radius={0}
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
