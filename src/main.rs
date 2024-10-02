use poise::serenity_prelude as serenity;
type Error = Box<dyn std::error::Error + Send + Sync>;

#[tokio::main]
async fn main() {
    let framework = poise::Framework::builder()
        .options(poise::FrameworkOptions {
            commands: commands(),
            ..Default::default()
        })
        .setup(|ctx, _ready, framework| {
            Box::pin(async move {
                poise::builtins::register_globally(ctx, &framework.options().commands).await?;
                Ok(dj_linda::Data {})
            })
        })
        .build();

    let client = serenity::ClientBuilder::new(
        env!("DISCORD_TOKEN"),
        serenity::GatewayIntents::non_privileged(),
    )
    .framework(framework)
    .await;
    client.unwrap().start().await.unwrap();
}

fn commands() -> Vec<poise::Command<dj_linda::Data, Error>> {
    vec![dj_linda::ping(), dj_linda::register()]
}
